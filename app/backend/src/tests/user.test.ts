import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/SequelizeUser';
import JWT from '../utils/JWT';
import { users } from './mocks/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('user route', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('test login sucefull', async() => {
    sinon.stub(UserModel, 'findOne').resolves(users[0] as any);

    const { status, body } = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    expect(status).to.be.eq(200);
    expect(body).to.have.key('token');
  });
  it('test login with wrong password', async() => {
    sinon.stub(UserModel, 'findOne').resolves(users[0] as any);

    const { status, body } = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'wrong_password',
    });
    expect(status).to.be.eq(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });
  it('test getRole with admin', async() => {
    sinon.stub(UserModel, 'findOne').resolves(users[0] as any);
    sinon.stub(JWT, 'verify').returns('valid token');
    sinon.stub(JWT, 'decode').returns({ email: 'admin@admin.com' } as any);

    const { status, body} = await chai.request(app).get('/login/role').set('authorization', 'token');
    expect(status).to.be.eq(200);
    expect(body).to.deep.equal({ "role": "admin" });
  });
  it('test getRole without admin', async() => {
    const { status, body} = await chai.request(app).get('/login/role').set('authorization', 'token');
    expect(status).to.be.eq(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token'});
  });
});

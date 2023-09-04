import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchesModel from '../database/models/SequelizeMatch';
import JWT from '../utils/JWT';
import { matches } from './mocks/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('user route', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('test get matches', async() => {
    sinon.stub(MatchesModel, 'findAll').resolves(matches as any);
    
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.be.eq(200);
    expect(body).to.deep.equal(matches);
  });
});
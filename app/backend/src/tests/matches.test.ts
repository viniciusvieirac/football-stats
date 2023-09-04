import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchesModel from '../database/models/SequelizeMatch';
import JWT from '../utils/JWT';
import { matches, updateMatch, updateBody, inProgressMatches, finishedMatches } from './mocks/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('user route', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('test get all matches', async() => {
    sinon.stub(MatchesModel, 'findAll').resolves(matches as any);
    
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.be.eq(200);
    expect(body).to.deep.equal(matches);
  });
  it('test get all inProgress matches', async() => {
    sinon.stub(MatchesModel, 'findAll').resolves(inProgressMatches as any);
    
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    expect(status).to.be.eq(200);
    expect(body).to.deep.equal(inProgressMatches);
  });
  it('test get only finished matches', async() => {
    sinon.stub(MatchesModel, 'findAll').resolves(finishedMatches as any);
    
    const { status, body } = await chai.request(app).get('/matches?inProgress=false');
    expect(status).to.be.eq(200);
    expect(body).to.deep.equal(finishedMatches);
  });
  it('test updated matches', async() => {
      sinon
        .stub(MatchesModel, 'findByPk')
        .onFirstCall()
        .resolves(matches[0] as any)
        .onSecondCall()
        .resolves(updateMatch as any);
      sinon.stub(JWT, 'verify').returns('valid token');
      sinon.stub(JWT, 'decode').returns({ email: 'admin@admin.com'} as any);

      const { status, body } = await chai
        .request(app)
        .patch('/matches/1')
        .send(updateBody)
        .set('authorization', 'token');

      expect(body).to.deep.equal(updateMatch);
      expect(status).to.equal(200);
    });
});
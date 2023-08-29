import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeams from '../database/models/SequelizeTeams';

import { teams } from './mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('teams route', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('return all teams', async() => {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);

    const {status, body } = await chai.request(app).get('/teams');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(teams);
  });

  it('return /:id team', async() => {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(teams[0] as any);

    const {status, body } = await chai.request(app).get('/teams/1');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(teams[0]);
  });
  it('return not found if /:id team dont exists', async() => {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/777');

    expect(status).to.equal(404);
    expect(body).to.have.key('message');
    expect(body.message).to.equal('Team not found');
  });
  afterEach(sinon.restore);
});

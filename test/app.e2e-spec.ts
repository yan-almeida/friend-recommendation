import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await request(app.getHttpServer()).post('/clean').expect(204);
  });

  // it('/people (POST)', async () => {
  //   const response = await request(app.getHttpServer())
  //     .post('/people')
  //     .send(createPersonDto)
  //     .expect(201);

  //   expect(response.body).toEqual(
  //     expect.objectContaining({
  //       id: expect.any(String),
  //       ...createPersonDto,
  //     }),
  //   );

  //   await request(app.getHttpServer()).post('/clean').expect(204);
  // });

  it('/recommendations/:cpf (GET)', async () => {
    // people
    await request(app.getHttpServer())
      .post('/people')
      .send({ cpf: '01234567891', name: 'name-of' })
      .expect(201);
    await request(app.getHttpServer())
      .post('/people')
      .send({ cpf: '01234567892', name: 'name-of' })
      .expect(201);
    await request(app.getHttpServer())
      .post('/people')
      .send({ cpf: '01234567893', name: 'name-of' })
      .expect(201);
    await request(app.getHttpServer())
      .post('/people')
      .send({ cpf: '01234567894', name: 'name-of' })
      .expect(201);
    await request(app.getHttpServer())
      .post('/people')
      .send({ cpf: '01234567895', name: 'name-of' })
      .expect(201);

    // relationship
    await request(app.getHttpServer())
      .post('/relationships')
      .send({
        personCpf: '01234567891',
        followsCpf: '01234567892',
      })
      .expect(201);
    await request(app.getHttpServer())
      .post('/relationships')
      .send({
        personCpf: '01234567891',
        followsCpf: '01234567893',
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/relationships')
      .send({
        personCpf: '01234567892',
        followsCpf: '01234567894',
      })
      .expect(201);
    await request(app.getHttpServer())
      .post('/relationships')
      .send({
        personCpf: '01234567893',
        followsCpf: '01234567894',
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/relationships')
      .send({
        personCpf: '01234567893',
        followsCpf: '01234567895',
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .get('/recommendations/01234567891')
      .expect(200);

    expect(response.body).toEqual([
      {
        friendOfFriendToFollow: '01234567894',
        mutualFriends: 2,
      },
      {
        friendOfFriendToFollow: '01234567895',
        mutualFriends: 1,
      },
    ]);
  });
});

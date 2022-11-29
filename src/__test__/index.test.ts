import app from '../app';
import request from 'supertest';
 
describe('Test server', () => {
  it('save 1', async () => {
    const response = await request(app).post("/save").send({"firstname": "Mike", "lastname": "Tyson"});
    expect(response.statusCode).toBe(200);
  });
  it('save 2', async () => {
    const response = await request(app).post("/save").send({"firstname": "Mike", "lastname": "Tyson"});
    expect(response.statusCode).toBe(200);
  }); 
  it('get load', async () => {
    const response = await request(app).get("/load");
    expect(response.statusCode).toBe(200);
  }); 
  it('save error', async () => {
    const response = await request(app).post("/save").send({"firstname": "Mike", "lastname": "Tyson"});
    expect(response.statusCode).toBe(429);
  });  
  it('get load error', async () => {
    const response = await request(app).get("/load");
    expect(response.statusCode).toBe(429);
  }); 

  it('get another', async () => {
    const response = await request(app).get("/another");
    expect(response.statusCode).toBe(200);
  }); 
});

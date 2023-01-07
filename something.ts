// @ts-ignore
import express from 'express' 
// @ts-ignore
import cors from 'cors'
// @ts-ignore
import bodyParser from 'body-parser'

const app = express()
app.use(cors())
app.use(bodyParser())

app.get('/', async function(req: any, res: any){
   try {
    let sw = req.params.sw;
// On Windows Only...
const { spawn } = require('node:child_process');
const bat = spawn('solana-keygen', ['grind', '--starts-with', sw+':1', '--ignore-case']);

bat.stdout.on('data', (data: any) => {
  console.log(data.toString());
});

bat.stderr.on('data', (data: any) => {
  console.error(data.toString());
});

bat.on('exit', (code: any) => {
  console.log(`Child exited with code ${code}`);
});

   } catch (err){
    console.log(err)
   }
})

app.listen(3001)
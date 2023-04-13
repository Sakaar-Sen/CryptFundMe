import fs from "fs";

export default function handler(req, res) {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync('deployed_contracts_ui.json')) {
      fs.writeFileSync('deployed_contracts_ui.json', '[]');
    }
    //read data and send
    fs.readFile('deployed_contracts_ui.json', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File has been read");
      const json = JSON.parse(data);
      res.status(200).json(json);
      resolve();
    });

  }).catch((e) => {
    console.error("RAN INTO AN ERROR");
    console.error(e);
    res.status(500).json({ error: e.message });
    reject();
  });
}
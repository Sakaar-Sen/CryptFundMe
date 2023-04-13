import fs from "fs";

export default function handler(req, res) {
  return new Promise(async (resolve, reject) => {
    const { name, description } = req.body;
  
    //create file if it doesn't exist
    if (!fs.existsSync('deployed_contracts_ui.json')) {
      fs.writeFileSync('deployed_contracts_ui.json', '[]');
    }

    fs.readFile('deployed_contracts_ui.json', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      
      console.log("File has been read");
      const json = JSON.parse(data);
      json.push({ name, description });
      fs.writeFile('deployed_contracts_ui.json', JSON.stringify(json), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("File has been written");
        res.status(200).json({ name, description });  
        resolve();
      });
    });
    
  }).catch((e) => {
    console.error("RAN INTO AN ERROR");
    console.error(e);
    res.status(500).json({ error: e.message });
    reject();
  });

}

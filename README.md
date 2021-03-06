# php20-project-manager

- Įdiekite projektui nepriklausančius paketus ir Chrome naršyklės priedus:

  - Chrome įdiekite [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) plėtinį

  - Chrome įdiekite [React Context DevTool](https://chrome.google.com/webstore/detail/react-context-devtool/oddhnidmicpefilikhgeagedibnefkcf) plėtinį

- Įvykdykite komandas projekto kataloge. Rinkdami komandas, pakeiskite `<username>`, `<password>` ir `<domain>` atitinkamai vartotojo vardu, slaptažodžiu ir domeno pavadinimu.

  ```bash
  cp .env-development .env
  sed -i 's/DB_USERNAME=root/DB_USERNAME=<username>/g' .env
  sed -i 's/DB_PASSWORD=/DB_PASSWORD=<password>/g' .env
  sudo sh -c 'echo "127.0.0.1 <domain>.local" >> /etc/hosts'

  composer install
  php artisan migrate
  php artisan db:seed
  npm install
  npm run dev

  composer start
  ```

## Instrukcijos

[Instrukcijas](_doc/instrukcijos.md) galima rasti `_doc` kataloge

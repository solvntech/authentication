<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="https://jwt.io/img/pic_logo.svg" alt="Logo" width="80" height="80">
    <h3 align="center">SOL Authentication</h3>
    <p align="center">
        Authentication and authorization among applications or server APIs!
        <br />
        <br />
        <a href="">View Demo</a>
        ·
        <a href="https://github.com/solvntech/authentication/issues">Report Bug</a>
        ·
        <a href="https://github.com/solvntech/authentication/issues">Request Feature</a>
    </p>
</div>

<!-- TABLE OF CONTENTS -->
<ol>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#setup-developer-environment">Setup developer environment</a></li>
    <li><a href="#installation">Installation</a></li>
</ol>

<!-- GETTING STARTED -->
## Getting Started

_Coming soon..._

## Setup developer environment

* Install Version Control: [https://git-scm.com/](https://git-scm.com/)
* Install Docker: [https://www.docker.com/get-started/](https://www.docker.com/get-started/)
* Install NodeJS 16 LTS: [https://nodejs.org/en/](https://nodejs.org/en/)

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/solvntech/authentication.git
   ```
2. Install containers required
   ```sh
   docker-compose up
   ```
   _turn off **`node_server`** container_
3. Install NPM packages
   ```sh
   npm install
   ```
4. Copy from `.env.example` to `.env` and configure in `.env`
   ```dotenv
    PORT=[your application port]
    MONGODB_URI=[mongo uri from docker]
    DB_NAME=[db name]
    ACCESS_TOKEN_SECRET=<ACCESS_TOKEN_SECRET>
    REFRESH_TOKEN_SECRET=<REFRESH_TOKEN_SECRET>
   
    # email configs
    EMAIL_SERVICE=gmail
    HOST_EMAIL=<email>
    HOST_PASSWORD=<password>
   ```

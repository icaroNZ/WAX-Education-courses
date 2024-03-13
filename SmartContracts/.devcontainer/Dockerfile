FROM eosio/eosio-web-ide:v0.1.1

USER root

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    wget \
    git \
    build-essential \
    ca-certificates 

RUN apt-get install -y \
    libc6 \
    libgcc1 \
    libssl1.1 \
    libstdc++6 \
    libtinfo5 \
    zlib1g \
    libusb-1.0-0 \
    libcurl3-gnutls \
    libpq5


RUN wget https://github.com/eosio/eos/releases/download/v2.1.0/eosio_2.1.0-1-ubuntu-18.04_amd64.deb
RUN apt-get install -y ./eosio_2.1.0-1-ubuntu-18.04_amd64.deb || apt-get -f install


RUN wget https://github.com/eosio/eosio.cdt/releases/download/v1.8.0/eosio.cdt_1.8.0-1-ubuntu-18.04_amd64.deb
RUN apt-get install -y ./eosio.cdt_1.8.0-1-ubuntu-18.04_amd64.deb || apt-get -f install

RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* /eosio_2.1.0-1-ubuntu-18.04_amd64.deb /eosio.cdt_1.8.0-1-ubuntu-18.04_amd64.deb
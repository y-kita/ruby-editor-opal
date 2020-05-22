FROM ruby:2.7.0

RUN mkdir /app
WORKDIR /app

RUN apt-get update -qq
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install -y nodejs
RUN npm install -g yarn

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install
COPY . /app

RUN yarn install

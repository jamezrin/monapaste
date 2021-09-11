#!/usr/bin/env bash

docker-compose exec app npx prisma db push

docker-compose exec app npx prisma generate

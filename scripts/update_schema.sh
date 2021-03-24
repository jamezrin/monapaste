#!/usr/bin/env bash

docker-compose exec app npx prisma db push --preview-feature

docker-compose exec app npx prisma generate

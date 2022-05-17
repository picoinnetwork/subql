// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigureModule } from './configure/configure.module';
import { DbModule } from './db/db.module';
import { IndexerModule } from './indexer/indexer.module';
import { getLogger } from './utils/logger';

const logger = getLogger('w');
logger.info(process.env.DB_HOST);
@Module({
  imports: [
    DbModule.forRoot({
      host: process.env.DB_HOST ?? '127.0.0.1',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASS ?? 'postgres',
      database: process.env.DB_DATABASE ?? 'postgres',
    }),
    EventEmitterModule.forRoot(),
    ConfigureModule.register(),
    IndexerModule,
  ],
})
export class WorkerModule {}

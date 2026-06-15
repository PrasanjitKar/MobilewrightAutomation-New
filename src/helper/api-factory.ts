import { APIRequestContext, request } from '@playwright/test';
import { ConfigurationManager } from '../config/ConfigurationManager';
import logger from '../utils/logger';

export class ApiFactory {

    private apiContext?: APIRequestContext;

    async initApi(): Promise<APIRequestContext> {

        logger.info(
            'Initializing API session'
        );

        this.apiContext =
            await ApiClient.createSession();

        logger.info(
            'API session initialized'
        );

        return this.apiContext;
    }

    getApi(): APIRequestContext {

        if (!this.apiContext) {

            throw new Error(
                'API session not initialized'
            );
        }

        return this.apiContext;
    }

    async closeApi(): Promise<void> {

        if (this.apiContext) {

            await this.apiContext.dispose();

            logger.info(
                'API session closed'
            );
        }
    }
}

export class ApiClient {

    static async createSession(): Promise<APIRequestContext> {

        return await request.newContext({

            baseURL:
                ConfigurationManager.config().baseUrl,

            extraHTTPHeaders: {

                'Content-Type':
                    'application/json',

                Authorization:
                    `Bearer ${ConfigurationManager.config().authToken}`,

                'X-ORG-ID':
                    ConfigurationManager.config().orgId
            },

            timeout:
                ConfigurationManager.config().apiTimeout
        });
    }
}
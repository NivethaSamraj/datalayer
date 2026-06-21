import { Page, Locator } from '@playwright/test';
import { LocatorRegistry } from '../locators/registry/LocatorRegistry';
import { pageNameConstants } from '../constants/pageNameConstants';
import BrowserActionImpl from '../utils/BrowserActionsImpl';
import { LocatorFactory } from '../locators/registry/locatorTypes';
import { srpBasePage } from '../locators/base/srpPageLocators';
import { talbotsSRPPage } from '../locators/override/Talbots/srpPageLocators';
import { ann_taylorSRPPage } from '../locators/override/Ann_Taylor/srpPageLocators';

export const srpPageLocators = {

    ...srpBasePage,

    ...talbotsSRPPage,

    ...ann_taylorSRPPage
};

/**
 * Page Object Model for Product Listing Page (SRP)
 */
export class SRP extends BrowserActionImpl {

    readonly page: Page;

    private readonly locators:
        typeof srpPageLocators;

    constructor(
        page: Page
    ) {
        super();

        this.page = page;

        this.locators =
            LocatorRegistry.getLocators(
                pageNameConstants.SRPPAGE
            ) as typeof srpPageLocators;


        this.generateElementNamesForSelfHealing(this);
    }
    /**
     * Returns the number of search results displayed on the page.
     */
    async getSearchResultCount(): Promise<number> {

        const countText =
            await this.locators
                .searchResultCount(this.page)
                .textContent();

        if (!countText) {

            throw new Error(
                'Search result count not found'
            );
        }

        const count =
            parseInt(
                countText.replace(
                    /,/g,
                    ''
                ),
                10
            );

        if (isNaN(count)) {

            throw new Error(
                `Unable to parse search result count: ${countText}`
            );
        }

        return count;
    }

    /**
     * Navigates to a random product from the search results.
     */
    async navigateToRandomProduct(): Promise<void> {



        const productTiles =
            this.locators
                .productLinks(this.page);

        await this.waitForElement(
            productTiles
        );

        const count =
            await productTiles.count();

        if (count === 0) {

            throw new Error(
                'No products found on PLP'
            );
        }

        const randomIndex =
            Math.floor(
                Math.random() * count
            );

        const productLink =
            productTiles.nth(
                randomIndex
            );

        await productLink.click();

    }
}

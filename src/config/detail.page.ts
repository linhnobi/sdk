export class HTML {
    public static readonly INNER_TEXT = 'innerText';
    public static readonly ATTRIBUTE = 'attribute';
}

export class ConfigDetailPage {
    public static readonly PRODUCT_NAME = {
        SELECTOR: '#main_container > div.main-column > div.product > div.frame_center > div > div.product_name > h1',
        TYPE: HTML.INNER_TEXT,
    };

    public static readonly PRODUCT_ID = {
        SELECTOR: '#record_id',
        TYPE: HTML.ATTRIBUTE,
        ATTRIBUTE_NAME: 'value'
    };

    public static readonly PRODUCT_ORIGINAL_PRICE = {
        SELECTOR: '#basic_price',
        TYPE: HTML.ATTRIBUTE,
        ATTRIBUTE_NAME: 'value'
    };

    public static readonly PRODUCT_PRICE = {
        SELECTOR: '#main_container > div.main-column > div.product > div.frame_center > div > div.wrapper-info-pro.cf > div.right-info.fl > div.bor-retails.mt20 > form > div:nth-child(3) > meta:nth-child(3)',
        TYPE: HTML.ATTRIBUTE,
        ATTRIBUTE_NAME: 'content'
    };

    public static readonly PRODUCT_IMG = {
        SELECTOR: '#Zoomer > figure > img',
        TYPE: HTML.ATTRIBUTE,
        ATTRIBUTE_NAME: 'src'
    };

    
    public static readonly PRODUCT_BRAND = {
        SELECTOR: '#main_container > div.main-column > div.product > div.frame_center > div > div.code-manu.mt10.cf > div.stock > span > meta',
        TYPE: HTML.ATTRIBUTE,
        ATTRIBUTE_NAME: 'content'
    };

    public static readonly PRODUCT_NAME_CLASS = 'mo-pro-name';
    public static readonly PRODUCT_ORIGINAL_PRICE_CLASS = 'mo-pro-original-price';
    public static readonly PRODUCT_PRICE_CLASS = 'mo-pro-price';
    public static readonly PRODUCT_IMG_CLASS = 'mo-pro-img';;
}


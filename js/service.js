
const Service = {
    /**
     *
     * Product to csv Object
     *
     * @param product
     * @param values
     */
    productToCsvObject(product, values) {
        const GetOptionValue = function (optionSets, idOption, isOptionName) {
            var result = "";
            optionSets?.some(optionSet => {
                if (optionSet.options?.length > 0) {
                    var option = optionSet.options.find(x => x.id == idOption);
                    if (option && isOptionName == true) {
                        result = optionSet.value;
                        return true;
                    }
                    if (option) {
                        result = option.value;
                        return true;
                    }
                }
            });

            return result;
        }

        let index = 0;
        const images = {};
        for (const variant of product.variants) {
            let imageSrc = '';
            let imageVariant = '';
            if (product.featured_image) {
                imageSrc = product.featured_image;
            } else if (variant?.featured_image?.src) {
                imageSrc = variant.featured_image.src;
            } else if (product?.images[index]?.src) {
                imageSrc = product?.images[index]?.src;
            }
            if (variant?.featured_image?.src) {
                imageVariant = variant.featured_image.src;
            } else if (product.featured_image) {
                imageVariant = product.featured_image;
            } else if (product?.images[index]?.src) {
                imageVariant = product?.images[index]?.src;
            }

            if (imageSrc) {
                images[imageSrc] = imageSrc;
            }
            if (imageVariant) {
                images[imageVariant] = imageVariant;
            }

            if (PLATFORM == platform_fix.shopbase) {
                values.push({
                    "Handle": product.handle ?? "", // "Handle",
                    "Title": (index === 0 ? product.title : ""), // "Title",
                    "Body (HTML)": (index === 0 ? product.body_html : ""), // "Body (HTML)",
                    "Vendor": (index === 0 ? product.vendor ?? "" : ""), // "Vendor",
                    "Type": (index === 0 ? product.product_type ?? "" : ""), // "Type",
                    "Tags": (index === 0 ? product.tags?.join(',') : ""), // "Tags",
                    "Published": "TRUE",
                    "Option1 Name": GetOptionValue(product.option_sets, variant.option1, true),
                    "Option1 Value": GetOptionValue(product.option_sets, variant.option1, false),
                    "Option2 Name": GetOptionValue(product.option_sets, variant.option2, true),
                    "Option2 Value": GetOptionValue(product.option_sets, variant.option2, false),
                    "Option3 Name": GetOptionValue(product.option_sets, variant.option3, true),
                    "Option3 Value": GetOptionValue(product.option_sets, variant.option3, false),
                    "Variant SKU": variant.sku ?? "", // "Variant SKU",
                    "Variant Grams": variant.grams ?? "", //"Variant Grams",
                    "Variant Inventory Tracker": variant.inventory_management ?? "", // "Variant Inventory Tracker",
                    "Variant Inventory Policy": "deny",
                    "Variant Fulfillment Service": "manual",  //"dsers-fulfillment-service",
                    "Variant Price": variant.price, // "Variant Price",
                    "Variant Compare At Price": variant.compare_at_price, // "Variant Compare At Price",
                    "Variant Requires Shipping": variant.requires_shipping ? "true" : "false", //"Variant Requires Shipping",
                    "Variant Taxable": variant.taxable ?? "", //"Variant Taxable",
                    "Variant Barcode": variant.barcode ?? "", //"Variant Barcode",
                    "Image Src": imageSrc, //"Image Src",
                    "Image Position": variant?.featured_image?.position ?? "", // "Image Position",
                    "Image Alt Text": variant?.featured_image?.alt ?? "", // "Image Alt Text",
                    "Gift Card": "false", //"Gift Card",
                    "SEO Title": "", // "SEO Title",
                    "SEO Description": "", //"SEO Description",
                    "Google Shopping / Google Product Category": "", //"Google Shopping / Google Product Category",
                    "Google Shopping / Gender": "", //"Google Shopping / Gender",
                    "Google Shopping / Age Group": "", //"Google Shopping / Age Group",
                    "Google Shopping / MPN": "", //"Google Shopping / MPN",
                    "Google Shopping / AdWords Grouping": "", //"Google Shopping / AdWords Grouping",
                    "Google Shopping / AdWords Labels": "", //"Google Shopping / AdWords Labels",
                    "Google Shopping / Condition": "", //"Google Shopping / Condition",
                    "Google Shopping / Custom Product": "", //"Google Shopping / Custom Product",
                    "Google Shopping / Custom Label 0": "", //"Google Shopping / Custom Label 0",
                    "Google Shopping / Custom Label 1": "", //"Google Shopping / Custom Label 1",
                    "Google Shopping / Custom Label 2": "", //"Google Shopping / Custom Label 2",
                    "Google Shopping / Custom Label 3": "", //"Google Shopping / Custom Label 3",
                    "Google Shopping / Custom Label 4": "", //"Google Shopping / Custom Label 4",
                    "Variant Image": imageVariant, //"Variant Image",
                    "Variant Weight Unit": "", //"Variant Weight Unit",
                    "Variant Tax Code": "", //"Variant Tax Code",
                    "Cost per item": "", //"Cost per item",
                    "Status": "active"
                    // "Collection": index === 0 ? product.collection : ""
                });
            } else if (PLATFORM == platform_fix.shopify) {
                values.push({
                    "Handle": product.handle ?? "", // "Handle",
                    "Title": (index === 0 ? product.title : ""), // "Title",
                    "Body (HTML)": (index === 0 ? product.body_html : ""), // "Body (HTML)",
                    "Vendor": (index === 0 ? product.vendor ?? "" : ""), // "Vendor",
                    "Type": (index === 0 ? product.product_type ?? "" : ""), // "Type",
                    "Tags": (index === 0 ? product.tags?.join(',') : ""), // "Tags",
                    "Published": (index === 0 ? product.published_at ?? "" : ""),
                    "Option1 Name": product.options && product.options[0] ? product.options[0]['name'] : "", // "Option1 Name",
                    "Option1 Value": variant.option1 ?? "", // "Option1 Value",
                    "Option2 Name": product.options && product.options[1] ? product.options[1]['name'] : "", // "Option2 Name",
                    "Option2 Value": variant.option2 ?? "", // "Option2 Value",
                    "Option3 Name": product.options && product.options[2] ? product.options[2]['name'] : "", // "Option3 Name",
                    "Option3 Value": variant.option3 ?? "", // "Option3 Value",
                    "Variant SKU": variant.sku ?? "", // "Variant SKU",
                    "Variant Grams": variant.grams ?? "", //"Variant Grams",
                    "Variant Inventory Tracker": variant.inventory_management ?? "", // "Variant Inventory Tracker",
                    "Variant Inventory Policy": "deny",
                    "Variant Fulfillment Service": "manual",  //"dsers-fulfillment-service",
                    "Variant Price": variant.price, // "Variant Price",
                    "Variant Compare At Price": variant.compare_at_price, // "Variant Compare At Price",
                    "Variant Requires Shipping": variant.requires_shipping ? "true" : "false", //"Variant Requires Shipping",
                    "Variant Taxable": variant.taxable ?? "", //"Variant Taxable",
                    "Variant Barcode": variant.barcode ?? "", //"Variant Barcode",
                    "Image Src": imageSrc, //"Image Src",
                    "Image Position": variant?.featured_image?.position ?? "", // "Image Position",
                    "Image Alt Text": variant?.featured_image?.alt ?? "", // "Image Alt Text",
                    "Gift Card": "false", //"Gift Card",
                    "SEO Title": "", // "SEO Title",
                    "SEO Description": "", //"SEO Description",
                    "Google Shopping / Google Product Category": "", //"Google Shopping / Google Product Category",
                    "Google Shopping / Gender": "", //"Google Shopping / Gender",
                    "Google Shopping / Age Group": "", //"Google Shopping / Age Group",
                    "Google Shopping / MPN": "", //"Google Shopping / MPN",
                    "Google Shopping / AdWords Grouping": "", //"Google Shopping / AdWords Grouping",
                    "Google Shopping / AdWords Labels": "", //"Google Shopping / AdWords Labels",
                    "Google Shopping / Condition": "", //"Google Shopping / Condition",
                    "Google Shopping / Custom Product": "", //"Google Shopping / Custom Product",
                    "Google Shopping / Custom Label 0": "", //"Google Shopping / Custom Label 0",
                    "Google Shopping / Custom Label 1": "", //"Google Shopping / Custom Label 1",
                    "Google Shopping / Custom Label 2": "", //"Google Shopping / Custom Label 2",
                    "Google Shopping / Custom Label 3": "", //"Google Shopping / Custom Label 3",
                    "Google Shopping / Custom Label 4": "", //"Google Shopping / Custom Label 4",
                    "Variant Image": imageVariant, //"Variant Image",
                    "Variant Weight Unit": "", //"Variant Weight Unit",
                    "Variant Tax Code": "", //"Variant Tax Code",
                    "Cost per item": "", //"Cost per item",
                    "Status": "active"
                    // "Collection": index === 0 ? product.collection : ""
                });
            } else if (PLATFORM == platform_fix.wordpress) {
            }
         
            index++;

            if (index === product.variants.length) {
                for (let image of product.images) {
                    if (images[image.src]) {
                        continue;
                    }

                    values.push({
                        "Handle": product.handle ?? "", // "Handle",
                        "Title": "", // "Title",
                        "Body (HTML)": "", // "Body (HTML)",
                        "Vendor": "", // "Vendor",
                        "Type": "", // "Type",
                        "Tags": "", // "Tags",
                        "Published": "",
                        "Option1 Name": "", // "Option1 Name",
                        "Option1 Value": "", // "Option1 Value",
                        "Option2 Name": "", // "Option2 Name",
                        "Option2 Value": "", // "Option2 Value",
                        "Option3 Name": "", // "Option3 Name",
                        "Option3 Value": "", // "Option3 Value",
                        "Variant SKU": "", // "Variant SKU",
                        "Variant Grams": "", //"Variant Grams",
                        "Variant Inventory Tracker": "", // "Variant Inventory Tracker",
                        "Variant Inventory Policy": "",
                        "Variant Fulfillment Service": "",  //"dsers-fulfillment-service",
                        "Variant Price": "", // "Variant Price",
                        "Variant Compare At Price": "", // "Variant Compare At Price",
                        "Variant Requires Shipping": "", //"Variant Requires Shipping",
                        "Variant Taxable": "", //"Variant Taxable",
                        "Variant Barcode": "", //"Variant Barcode",
                        "Image Src": image.src, //"Image Src",
                        "Image Position": image.position, // "Image Position",
                        "Image Alt Text": "", // "Image Alt Text",
                        "Gift Card": "", //"Gift Card",
                        "SEO Title": "", // "SEO Title",
                        "SEO Description": "", //"SEO Description",
                        "Google Shopping / Google Product Category": "", //"Google Shopping / Google Product Category",
                        "Google Shopping / Gender": "", //"Google Shopping / Gender",
                        "Google Shopping / Age Group": "", //"Google Shopping / Age Group",
                        "Google Shopping / MPN": "", //"Google Shopping / MPN",
                        "Google Shopping / AdWords Grouping": "", //"Google Shopping / AdWords Grouping",
                        "Google Shopping / AdWords Labels": "", //"Google Shopping / AdWords Labels",
                        "Google Shopping / Condition": "", //"Google Shopping / Condition",
                        "Google Shopping / Custom Product": "", //"Google Shopping / Custom Product",
                        "Google Shopping / Custom Label 0": "", //"Google Shopping / Custom Label 0",
                        "Google Shopping / Custom Label 1": "", //"Google Shopping / Custom Label 1",
                        "Google Shopping / Custom Label 2": "", //"Google Shopping / Custom Label 2",
                        "Google Shopping / Custom Label 3": "", //"Google Shopping / Custom Label 3",
                        "Google Shopping / Custom Label 4": "", //"Google Shopping / Custom Label 4",
                        "Variant Image": "", //"Variant Image",
                        "Variant Weight Unit": "", //"Variant Weight Unit",
                        "Variant Tax Code": "", //"Variant Tax Code",
                        "Cost per item": "", //"Cost per item",
                        "Status": ""
                    });
                }
            }
        }
    }
}
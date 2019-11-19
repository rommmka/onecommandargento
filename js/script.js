
// Variables
/*************************/

var domainName;
var licenseKey;
var themeName;
var frontendLocale;
var storeId;
var composerPath;
var phpPath;

/*************************/

function localeSetting(locale) {
    if ('en_US' != locale) {
        return locale;
    } else {
        return '';
    }
}

function storeIdSetting(storeId) {
     if (storeId == '') {
        return '0';
    } else if ('0' != storeId) {
        return storeId;
    } else {
        return '0';
    }
}

function composerSetting(composerPath) {
    if ( composerPath.trim() == '') {
        return 'composer';
    } else if ('composer' != composerPath) {
        return composerPath;
    } else {
        return 'composer';
    }
}

function phpSetting(phpPath) {
    if (phpPath.trim() == '') {
        return 'php';
    } else if ('php' != phpPath.trim()) {
        return phpPath;
    } else {
        return 'php';
    }
}


function enabledAmp(phpPath, storeId) {
    if (document.getElementById('amp').checked){
        return phpPath + ' bin/magento swissup:module:install --store=' + storeIdSetting(storeId) + ' Swissup_Amp;';
    }
}


function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);
  return arrayOfStrings.join('\n\n');
}

function generateCode(domainName = 'localhost', licenseKey = 'LICENSE') {

    var additionalLocale = document.getElementById("locale").value;
    additionalLocale = additionalLocale.trim();

    var storeId = document.getElementById("store-id").value;
    storeId = storeId.trim();

    var composerPath = document.getElementById("composer-path").value;
    composerPath = composerPath.trim();

    var phpPath = document.getElementById("php-path").value;
    phpPath = phpPath.trim();

    var domainName = document.getElementById("domain-name").value;
    domainName = domainName.trim();

    var licenseKey = document.getElementById("license-key").value;
    licenseKey = licenseKey.trim();

    var themeName = document.getElementById("theme-name").value;

    var code = phpSetting(phpPath) + ' ' + composerSetting(composerPath) + ' config repositories.swissuplabs composer https://ci.swissuplabs.com/api/packages.json;'+
        phpSetting(phpPath) + ' ' + composerSetting(composerPath) + ' config -a -g http-basic.ci.swissuplabs.com "' + domainName + '" "' + licenseKey + '";' +
        phpSetting(phpPath) + ' ' + composerSetting(composerPath) + ' require swissup/argento-m2;' +
        phpSetting(phpPath) + ' bin/magento module:enable Swissup_Core Swissup_Ajaxpro Swissup_Ajaxsearch Swissup_Amp Swissup_Askit Swissup_Attributepages Swissup_Compare Swissup_EasySlide Swissup_Easybanner Swissup_Easycatalogimg Swissup_Easytabs Swissup_Fblike Swissup_FeaturedAttributes Swissup_FontAwesome Swissup_Gdpr Swissup_GdprAskit Swissup_GdprTestimonials Swissup_Highlight Swissup_HoverGallery Swissup_Hreflang Swissup_Lightboxpro Swissup_Navigationpro Swissup_ProLabels Swissup_Reviewreminder Swissup_RichSnippets Swissup_Rtl Swissup_SeoCanonical Swissup_SeoCore Swissup_SeoCrossLinks Swissup_SeoHtmlSitemap Swissup_SeoImages Swissup_QuantitySwitcher Swissup_SeoPager Swissup_SeoUrls Swissup_SeoTemplates Swissup_SeoXmlSitemap Swissup_SlickCarousel Swissup_SoldTogether Swissup_Stickyfill Swissup_Suggestpage Swissup_Testimonials Swissup_ThemeEditor Swissup_ThemeEditorArgentoEssence Swissup_ThemeEditorArgentoFlat Swissup_ThemeEditorArgentoForce Swissup_ThemeEditorArgentoLuxury Swissup_ThemeEditorArgentoPure2 Swissup_ThemeEditorArgentoMall Swissup_ThemeEditorArgentoStripes;' +
        phpSetting(phpPath) + ' bin/magento setup:upgrade;' +
        'rm -rf pub/static/_requirejs var/view_preprocessed pub/static/frontend/ pub/static/adminhtml/ generated/code/;' +
        phpSetting(phpPath) + ' bin/magento setup:upgrade;' +
        phpSetting(phpPath) + ' bin/magento setup:static-content:deploy en_US ' + localeSetting(additionalLocale) + ' -f ;' +
        phpSetting(phpPath) + ' bin/magento swissup:module:install --store=' + storeIdSetting(storeId) + ' ' +
        themeName + ' ' + licenseKey + ';' +
        enabledAmp(phpSetting(phpPath), storeId) +
        'cp -R vendor/swissup/theme-frontend-argento-essence/resources/media/*;' +
        'cp -R vendor/swissup/theme-frontend-argento-force/resources/media/* pub/media/;'+
        'cp -R vendor/swissup/theme-frontend-argento-flat/resources/media/* pub/media/;'+
        'cp -R vendor/swissup/theme-frontend-argento-pure2/resources/media/* pub/media/;'+
        'cp -R vendor/swissup/theme-frontend-argento-mall/resources/media/* pub/media/;'+
        'cp -R vendor/swissup/theme-frontend-argento-luxury/resources/media/* pub/media/;'+
        'cp -R vendor/swissup/theme-frontend-argento-stripes/resources/media/* pub/media/;'+
        'cp -R vendor/swissup/module-amp/resources/media/* pub/media/;'+
        'chmod -R 775 pub/media/easybanner pub/media/easyslide pub/media/highlight pub/media/wysiwyg;';

        document.getElementById("generated-content").innerHTML = code;
};



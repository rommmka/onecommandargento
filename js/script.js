
// Variables
/*************************/

var domainName;
var licenseKey;
var themeName;
var frontendLocale;
var storeId;
var composerPath;
var phpPath;
var oldState;

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

    var path = 'php';
    var server = '';
    if (enabledMemoryLimit() != '' || enabledAllowUrlFopen() != ''){
        server = ' -d ' + enabledMemoryLimit() + enabledAllowUrlFopen();
    }

    if (phpPath.trim() == '') {
        return path + server;
    } else if ('php' != phpPath.trim()) {
        return phpPath + server;
    } else {
        return path + server;
    }
}
function phpComposerSetting(phpPath, composerPath) {

    var path = phpSetting(phpPath);

    if (composerSetting(composerPath) == 'composer'){
        return '';
    } else {
        return path;
    }
}

function enabledAmp(phpPath, storeId) {
    if (document.getElementById('amp').checked){
        return phpPath + ' bin/magento swissup:module:install --store=' + storeIdSetting(storeId) + ' Swissup_Amp && ';
    } else {
        return '';
    }
}

function enabledDownloadComposer(oldState) {

    var composerPath = document.getElementById("composer-path").value;

    if (document.getElementById('download-composer').checked){
        document.getElementById("composer-path").value = 'composer.phar';
        return 'curl -sS https://getcomposer.org/installer | php && ';
    } else if (composerPath == 'composer.phar' && !document.getElementById('download-composer').checked) {
        document.getElementById("composer-path").value = oldState;
        return '';
    } else {
        return '';
    }
}

function enabledMemoryLimit() {

    if (document.getElementById('memory-limit').checked){
        return ' memory_limit=-1 ';
    } else {

        return '';
    }
}
function enabledAllowUrlFopen() {
    if (document.getElementById('allow-url-fopen').checked){
        return ' allow_url_fopen=1 ';
    } else {
        return '';
    }
}

function splitString(stringToSplit, separator) {
    return stringToSplit.split(separator).join("<br /><br />");
}

function generateCode(domainName = 'localhost', licenseKey = 'LICENSE') {

    var additionalLocale = document.getElementById("locale").value;
    additionalLocale = additionalLocale.trim();

    var storeId = document.getElementById("store-id").value;
    storeId = storeId.trim();

    var composerPath = document.getElementById("composer-path").value;
    composerPath = composerPath.trim();

    if (composerPath != 'composer.phar') {
        oldState = composerPath;
    }

    var phpPath = document.getElementById("php-path").value;
    phpPath = phpPath.trim();

    var domainName = document.getElementById("domain-name").value;
    domainName = domainName.trim();

    var licenseKey = document.getElementById("license-key").value;
    licenseKey = licenseKey.trim();

    var themeName = document.getElementById("theme-name").value;

    var code = enabledDownloadComposer(oldState) +
        phpSetting(phpPath) + ' bin/magento maintenance:enable && ' +
        phpComposerSetting(phpPath, composerPath) + ' ' + composerSetting(composerPath) + ' config repositories.swissuplabs composer https://ci.swissuplabs.com/api/packages.json && '+
        phpComposerSetting(phpPath, composerPath) + ' ' + composerSetting(composerPath) + ' config -a -g http-basic.ci.swissuplabs.com "' + domainName + '" "' + licenseKey + '" && ' +
        phpComposerSetting(phpPath, composerPath) + ' ' + composerSetting(composerPath) + ' require swissup/argento-m2 && ' +
        phpSetting(phpPath) + ' bin/magento setup:upgrade && ' +
        'rm -rf pub/static/_requirejs var/view_preprocessed pub/static/frontend/ pub/static/adminhtml/ generated/code/ && ' +
        phpSetting(phpPath) + ' bin/magento setup:static-content:deploy en_US ' + localeSetting(additionalLocale) + ' -f  && ' +
        phpSetting(phpPath) + ' bin/magento swissup:module:install --store=' + storeIdSetting(storeId) + ' ' +
        themeName + ' ' + licenseKey + ' && ' +
        enabledAmp(phpSetting(phpPath), storeId) +
        'cp -R vendor/swissup/theme-frontend-argento-essence/resources/media/* && ' +
        'cp -R vendor/swissup/theme-frontend-argento-force/resources/media/* pub/media/ && '+
        'cp -R vendor/swissup/theme-frontend-argento-flat/resources/media/* pub/media/ && '+
        'cp -R vendor/swissup/theme-frontend-argento-pure2/resources/media/* pub/media/ && '+
        'cp -R vendor/swissup/theme-frontend-argento-mall/resources/media/* pub/media/ && '+
        'cp -R vendor/swissup/theme-frontend-argento-luxury/resources/media/* pub/media/ && '+
        'cp -R vendor/swissup/theme-frontend-argento-stripes/resources/media/* pub/media/ && '+
        'cp -R vendor/swissup/module-amp/resources/media/* pub/media/ && '+
        'chmod -R 775 pub/media/easybanner pub/media/easyslide pub/media/highlight pub/media/wysiwyg && ' +
        phpSetting(phpPath) + ' bin/magento maintenance:disable';

        document.getElementById("hidden-code").innerHTML = code;

        //Formatting

        if (document.getElementById('switch-input').checked){
            code = splitString(code, ' && ');
        }


        document.getElementById("generated-content").innerHTML = code;
}

function changeScreenshot() {
    var theme = document.getElementById("theme-name").value;

    switch (true) {
        case theme == 'Swissup_ThemeFrontendArgentoEssence':
            document.getElementById('screenshot-url').href ="https://magento2.argentocommerce.com/essence_en/";
            document.getElementById('screenshot-img').src = "images/screenshots/homepage-essence.png";
            break;
        case theme == 'Swissup_ThemeFrontendArgentoFlat':
            document.getElementById('screenshot-url').href ="https://magento2.argentocommerce.com/flat_en/";
            document.getElementById('screenshot-img').src = "images/screenshots/homepage-flat.png";
            break;
        case theme == 'Swissup_ThemeFrontendArgentoPure2':
            document.getElementById('screenshot-url').href ="https://magento2.argentocommerce.com/pure_en/";
            document.getElementById('screenshot-img').src = "images/screenshots/homepage-pure2.png";
            break;
        case theme == 'Swissup_ThemeFrontendArgentoMall':
            document.getElementById('screenshot-url').href ="https://magento2.argentocommerce.com/mall_en/";
            document.getElementById('screenshot-img').src = "images/screenshots/homepage-mall.png";
            break;
        case theme == 'Swissup_ThemeFrontendArgentoLuxury':
            document.getElementById('screenshot-url').href ="https://magento2.argentocommerce.com/luxury_en/";
            document.getElementById('screenshot-img').src = "images/screenshots/homepage-luxury.png";
            break;
        case theme == 'Swissup_ThemeFrontendArgentoStripes':
            document.getElementById('screenshot-url').href ="https://magento2.argentocommerce.com/stripes_en";
            document.getElementById('screenshot-img').src = "images/screenshots/homepage-stripes.png";
            break;
        case theme == 'Swissup_ThemeFrontendArgentoForce':
            document.getElementById('screenshot-url').href ="https://magento2.argentocommerce.com/force_en/";
            document.getElementById('screenshot-img').src = "images/screenshots/force-400.webp";
            break;
      default:
        console.log("Wrong theme value");
    }
}

function copy() {
  var copyText = document.getElementById("hidden-code");
  copyText.select();
  document.execCommand("copy");
}

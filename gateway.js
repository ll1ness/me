/**
 * Gateway System - Country-based Access Control (Minimal)
 */

(function() {
    'use strict';

    const GATEWAY_CONFIG = {
        blockedCountries: ['US', 'UK'],
        storageKeys: {
            intendedPage: 'gateway_intended_page',
            gatewayPassed: 'gateway_passed',
            gatewayRedirect: 'gateway_redirect'
        },
        geoApi: 'https://get.geojs.io/v1/ip/geo.json'
    };

    let currentPage = '';

    function getNavigationType() {
        if (performance.getEntriesByType && performance.getEntriesByType('navigation').length > 0) {
            return performance.getEntriesByType('navigation')[0].type;
        }
        if (performance.navigation) {
            switch (performance.navigation.type) {
                case performance.navigation.TYPE_RELOAD: return 'reload';
                case performance.navigation.TYPE_BACK_FORWARD: return 'back_forward';
                case performance.navigation.TYPE_NAVIGATE: return 'navigate';
            }
        }
        return 'navigate';
    }

    function init() {
        currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const isGatewayPassed = localStorage.getItem(GATEWAY_CONFIG.storageKeys.gatewayPassed) === 'true';

        const referrer = document.referrer;
        let isInternalReferrer = false;
        try {
            if (referrer) {
                const refUrl = new URL(referrer);
                isInternalReferrer = refUrl.hostname === window.location.hostname;
            }
        } catch (e) {
            isInternalReferrer = false;
        }

        const isGatewayRedirect = localStorage.getItem(GATEWAY_CONFIG.storageKeys.gatewayRedirect) === 'true';
        localStorage.removeItem(GATEWAY_CONFIG.storageKeys.gatewayRedirect);

        if (currentPage === 'gateway.html' || currentPage === 'gateway') {
            localStorage.removeItem(GATEWAY_CONFIG.storageKeys.gatewayPassed);
            runGatewayCheck();
            return;
        }

        if (!isGatewayPassed) {
            localStorage.setItem(GATEWAY_CONFIG.storageKeys.intendedPage, currentPage);
            window.location.href = 'gateway.html';
            return;
        }

        if (!isInternalReferrer) {
            localStorage.setItem(GATEWAY_CONFIG.storageKeys.intendedPage, currentPage);
            window.location.href = 'gateway.html';
            return;
        }

        if (!isGatewayRedirect) {
            const navType = getNavigationType();
            if (navType === 'navigate') {
                const navCount = parseInt(localStorage.getItem(GATEWAY_CONFIG.storageKeys.navigationCount) || '0') + 1;
                localStorage.setItem(GATEWAY_CONFIG.storageKeys.navigationCount, navCount.toString());
                if (navCount >= 2) {
                    localStorage.setItem(GATEWAY_CONFIG.storageKeys.intendedPage, currentPage);
                    localStorage.setItem(GATEWAY_CONFIG.storageKeys.navigationCount, '0');
                    window.location.href = 'gateway.html';
                    return;
                }
            }
        }
    }

    async function runGatewayCheck() {
        try {
            const countryCode = await detectCountry();

            if (!countryCode) {
                showState('error');
                return;
            }

            const isBlocked = GATEWAY_CONFIG.blockedCountries.includes(countryCode);
            if (isBlocked) {
                showState('blocked', countryCode);
                blockAccess();
            } else {
                localStorage.setItem(GATEWAY_CONFIG.storageKeys.gatewayPassed, 'true');
                showState('allowed', countryCode);
                // Immediate redirect
                proceedToIntendedPage();
            }
        } catch (error) {
            showState('error');
        }
    }

    async function detectCountry() {
        const timeoutMs = 5000;
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
            const response = await fetch(GATEWAY_CONFIG.geoApi, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!response.ok) return null;
            const data = await response.json();
            let countryCode = null;
            if (data.country_code) countryCode = data.country_code.toUpperCase();
            else if (data.countryCode) countryCode = data.countryCode.toUpperCase();
            else if (data.country && data.country.length === 2) countryCode = data.country.toUpperCase();
            if (countryCode && /^[A-Z]{2}$/.test(countryCode)) return countryCode;
        } catch (e) {}
        return null;
    }

    function showState(state, countryCode = '') {
        const container = document.getElementById('gateway-container');
        const message = document.getElementById('gateway-message');
        const icon = document.getElementById('gateway-icon');
        const country = document.getElementById('gateway-country');
        const actionBtn = document.getElementById('gateway-action-btn');

        if (!container || !message) return;

        // Reset
        icon.textContent = '';
        actionBtn.style.display = 'none';

        switch (state) {
            case 'checking':
                icon.textContent = '...';
                message.textContent = 'Проверка вашего местоположения...';
                country.textContent = '';
                break;
            case 'allowed':
                icon.textContent = '✓';
                message.textContent = 'Доступ разрешён';
                country.textContent = `Страна: ${getCountryName(countryCode)} (${countryCode})`;
                break;
            case 'blocked':
                icon.textContent = '✗';
                message.textContent = 'Доступ запрещён';
                country.textContent = `Из вашей страны (${getCountryName(countryCode)} - ${countryCode}) доступ ограничен.`;
                break;
            case 'error':
                icon.textContent = '⚠';
                message.textContent = 'Не удалось определить местоположение';
                country.textContent = 'Попробуйте ещё раз.';
                actionBtn.style.display = 'inline-block';
                actionBtn.onclick = function() {
                    localStorage.removeItem(GATEWAY_CONFIG.storageKeys.gatewayPassed);
                    runGatewayCheck();
                };
                break;
        }
    }

    function blockAccess() {
        localStorage.removeItem(GATEWAY_CONFIG.storageKeys.intendedPage);
        localStorage.removeItem(GATEWAY_CONFIG.storageKeys.gatewayPassed);
        setTimeout(() => {
            document.body.style.pointerEvents = 'none';
        }, 2000);
    }

    function proceedToIntendedPage() {
        const intendedPage = localStorage.getItem(GATEWAY_CONFIG.storageKeys.intendedPage) || 'index.html';
        localStorage.removeItem(GATEWAY_CONFIG.storageKeys.intendedPage);
        localStorage.setItem(GATEWAY_CONFIG.storageKeys.gatewayRedirect, 'true');
        localStorage.setItem(GATEWAY_CONFIG.storageKeys.navigationCount, '0');
        if (intendedPage && intendedPage !== 'gateway.html' && intendedPage !== 'gateway') {
            window.location.href = intendedPage;
        } else {
            window.location.href = 'index.html';
        }
    }

    function getCountryName(code) {
        const countries = {
            'AF':'Афганистан','AL':'Албания','DZ':'Алжир','AR':'Аргентина','AM':'Армения',
            'AU':'Австралия','AT':'Австрия','AZ':'Азербайджан','BH':'Бахрейн','BD':'Бангладеш',
            'BY':'Беларусь','BE':'Бельгия','BZ':'Белиз','BO':'Боливия','BA':'Босния и Герцеговина',
            'BR':'Бразилия','BN':'Бруней','BG':'Болгария','CA':'Канада','KH':'Камбоджа',
            'CL':'Чили','CN':'Китай','CO':'Колумбия','CR':'Коста-Рика','HR':'Хорватия',
            'CY':'Кипр','CZ':'Чехия','DK':'Дания','DO':'Доминикана','EC':'Эквадор',
            'EG':'Египет','SV':'Сальвадор','EE':'Эстония','FI':'Финляндия','FR':'Франция',
            'GE':'Грузия','DE':'Германия','GR':'Греция','GT':'Гватемала','HN':'Гондурас',
            'HK':'Гонконг','HU':'Венгрия','IS':'Исландия','IN':'Индия','ID':'Индонезия',
            'IR':'Иран','IQ':'Ирак','IE':'Ирландия','IL':'Израиль','IT':'Италия',
            'JP':'Япония','JO':'Иордания','KZ':'Казахстан','KE':'Кения','KR':'Южная Корея',
            'KW':'Кувейт','KG':'Кыргызстан','LA':'Лаос','LV':'Латвия','LB':'Ливан',
            'LY':'Ливия','LI':'Лихтенштейн','LT':'Литва','LU':'Люксембург','MO':'Макао',
            'MY':'Малайзия','MT':'Мальта','MX':'Мексика','MD':'Молдова','MC':'Монако',
            'MN':'Монголия','ME':'Черногория','MA':'Марокко','NP':'Непал','NL':'Нидерланды',
            'NZ':'Новая Зеландия','NI':'Никарагуа','NG':'Нигерия','MK':'Северная Македония',
            'NO':'Норвегия','OM':'Оман','PK':'Пакистан','PA':'Панама','PY':'Парагвай',
            'PE':'Перу','PH':'Филиппины','PL':'Польша','PT':'Португалия','QA':'Катар',
            'RO':'Румыния','RU':'Россия','SA':'Саудовская Аравия','RS':'Сербия','SG':'Сингапур',
            'SK':'Словакия','SI':'Словения','ZA':'ЮАР','ES':'Испания','LK':'Шри-Ланка',
            'SE':'Швеция','CH':'Швейцария','SY':'Сирия','TW':'Тайвань','TJ':'Таджикистан',
            'TH':'Таиланд','TR':'Турция','UA':'Украина','AE':'ОАЭ','GB':'Великобритания',
            'US':'США','UY':'Уругвай','UZ':'Узбекистан','VE':'Венесуэла','VN':'Вьетнам',
            'YE':'Йемен','CU':'Куба','KP':'Северная Корея'
        };
        return countries[code] || code;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.GatewaySystem = { init, runGatewayCheck, proceedToIntendedPage, blockAccess };
})();

import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import 'src/module/sw-settings-seo/component/sw-seo-url';

function createWrapper() {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    return shallowMount(Shopware.Component.build('sw-seo-url'), {
        localVue,
        stubs: {
            'sw-card': {
                template: '<div><slot name="toolbar"></slot></div>'
            },
            'sw-sales-channel-switch': true
        },
        provide: {
            repositoryFactory: {
                create: () => ({
                    search: () => Promise.resolve([]),
                    create: () => ({}),
                    schema: {
                        entity: {}
                    }
                })
            }
        }
    });
}

describe('src/module/sw-settings-seo/component/sw-seo-url', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = createWrapper();
        Shopware.State.commit('swSeoUrl/setCurrentSeoUrl', '');
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('should be a Vue.js component', async () => {
        expect(wrapper.vm).toBeTruthy();
    });

    it('sales channel switch should not be disabled', async () => {
        await wrapper.setData({
            showEmptySeoUrlError: false
        });

        const salesChannelSwitch = wrapper.find('sw-sales-channel-switch-stub');
        expect(salesChannelSwitch.attributes().disabled).toBeUndefined();
    });

    it('sales channel switch should not be disabled', async () => {
        wrapper.vm.showEmptySeoUrlError = false;
        await wrapper.setProps({
            disabled: true
        });

        const salesChannelSwitch = wrapper.find('sw-sales-channel-switch-stub');
        expect(salesChannelSwitch.attributes().disabled).toBe('true');
    });
});

import CounterInput from "@/components/CounterInput.vue"
import  { shallowMount } from "@vue/test-utils"
import { nextTick } from "vue"

describe('Counter Input component', () => {
    it('emits input event when input value changes', () => {
        const NEW_VALUE = '34';
        const wrapper = shallowMount(CounterInput);
        wrapper.find('input').setValue(NEW_VALUE);

        expect(wrapper.emitted()[CounterInput.model?.event ?? 'input']).toStrictEqual([[NEW_VALUE]])
    })
})

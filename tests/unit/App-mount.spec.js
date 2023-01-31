import App from "@/App.vue"
import  { mount } from "@vue/test-utils"
import { nextTick } from "vue"

describe('Counter', () => {
    let wrapper;

    const findButtonByText = (text) => wrapper.findAll('button').wrappers.find(w => w.text() === text)

    const createComponent = (props) => {
        wrapper = mount(App, {
            //attachTo: document.body // компонент добавлен в document
            propsData: props
        });
    }

    // afterEach(() => {
    //     wrapper.destroy();
    // }) -  заменено функционалов в testSetup.js

    it('shows 0 when initialized', () => {
        // Arrange
        createComponent();

        //Assert
        expect(wrapper.text()).toContain('0')
    })

    it.each`
       buttonText | change | expectedResult
       ${'+'} | ${'increments by one'} | ${'1'}
       ${'-'} | ${'decrements by one'} | ${'-1'}
    `('$change when $buttonText button clicked',
        async ({buttonText, expectedResult}) => {
        createComponent();

        await findButtonByText(buttonText).trigger('click');
        // await nextTick(); вместо await выше

        expect(wrapper.text()).toContain(expectedResult)
    })

    const BACK_TO_0_TEXT = 'Back to 0';

    it('shows reset button when counter is below zero', async () => {
        // Arrange
        createComponent();
        await findButtonByText('-').trigger('click');
        expect(wrapper.text()).toContain('-1');

        expect(findButtonByText(BACK_TO_0_TEXT).exists()).toBe(true)
    })

    it('does not show reset button when counter is not below zero', async () => {
        createComponent();

        // негативная проверка
        expect(findButtonByText(BACK_TO_0_TEXT)).toBe(undefined)
    })

    it('increases by one when plus key is pressed', async () => {
        createComponent();

        const event = new KeyboardEvent('keyup', {
            key: '+'
        });

        document.dispatchEvent(event);
        await nextTick();

        expect(wrapper.text()).toContain('1');
    })

    it('removes attached event listener when destroyed', async () => {
        jest.spyOn(document, 'addEventListener');
        jest.spyOn(document, 'removeEventListener');

        createComponent();

        const [,keyUpListener] = document.addEventListener.mock.calls.find(([key]) => key === 'keyup');
        expect(document.removeEventListener).not.toHaveBeenCalledWith('keyup', keyUpListener);

        wrapper.destroy();

        expect(document.removeEventListener).toHaveBeenCalledWith('keyup', keyUpListener);
        console.log(document.addEventListener.mock.calls)
    })

    it('correctly initializes when initialValue is passed', () => {
        const INITIAL_VALUE = 5;
        createComponent({initialValue: INITIAL_VALUE});

        expect(wrapper.text()).toContain(INITIAL_VALUE)
    })

    it('correctly resets when initialValue is changed', async () => {
        const INITIAL_VALUE = 5;
        const NEW_INITIAL_VALUE = 10;

        createComponent({initialValue: INITIAL_VALUE});
        await findButtonByText('-').trigger('click');

        await wrapper.setProps({ initialValue: NEW_INITIAL_VALUE })

        expect(wrapper.text()).toContain(NEW_INITIAL_VALUE)
    })

    it('correctly resets both counts when initialValue is changed', async () => {
        const INITIAL_VALUE = 5;
        const NEW_INITIAL_VALUE = 10;

        createComponent({initialValue: INITIAL_VALUE});
        await findButtonByText('-').trigger('click');
        await findButtonByText('dec2').trigger('click');
        expect(wrapper.text()).toContain(`${INITIAL_VALUE - 1} / -1`)

        await wrapper.setProps({ initialValue: NEW_INITIAL_VALUE });
        await nextTick()
        await nextTick() // иногда приходится ждать несколько тиков

        expect(wrapper.text()).toContain(`${NEW_INITIAL_VALUE} / 0`);
    })
})

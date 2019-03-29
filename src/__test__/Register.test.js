import React from 'react';
import {
    shallow
} from 'enzyme';
import Registration from '../screens/register';
import '../setupTest'
/**
 * describe what we are testing
 **/
describe('Registration Component', () => {
    /**
     * make our assertion and what we expect to happen 
     **/
    it('should render without throwing an error', () => {
        expect(shallow( < Registration / > )
                .exists())
            .toBe(true)
    })
    /**
     * within the Registration components describe function
     **/
    it('renders a firstName input', () => {
        expect(shallow( < Registration / > ).find('#firstname').length).toEqual(1)
    })
    it('renders a lastName input', () => {
        expect(shallow( < Registration / > ).find('#lastname').length).toEqual(1)
    })
    it('renders a email input', () => {
        expect(shallow( < Registration / > ).find('#email').length).toEqual(1)
    })
    it('renders a password input', () => {
        expect(shallow( < Registration / > ).find('#password').length).toEqual(1)
    })
    it('renders a confirm password input', () => {
        expect(shallow( < Registration / > ).find('#confirm-password').length).toEqual(1)
    })
    /**
     * within the Registration components describe function
     **/
    describe('firstName input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Registration / > );
            wrapper.find('#firstname').simulate('change', {
                target: {
                    name: 'firstname',
                    value: 'abc'
                }
            });
            expect(wrapper.state('firstname')).toEqual('abc');
        })
    })
    describe('lastName input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Registration / > );
            wrapper.find('#lastname').simulate('change', {
                target: {
                    name: 'lastname',
                    value: 'def'
                }
            });
            expect(wrapper.state('lastname')).toEqual('def');
        })
    })
    describe('Email input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Registration / > );
            wrapper.find('#email').simulate('change', {
                target: {
                    name: 'email',
                    value: 'abc@gmail.com'
                }
            });
            expect(wrapper.state('email')).toEqual('abc@gmail.com');
        })
    })
    describe('Password input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Registration / > );
            wrapper.find('#password')
                .simulate('change', {
                    target: {
                        name: 'password',
                        value: '12345678'
                    }
                });
            expect(wrapper.state('password')).toEqual('12345678');
        })
    })
    describe('confirmPassword input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Registration / > );
            wrapper.find('#confirm-password')
                .simulate('change', {
                    target: {
                        name: 'confirmPassword',
                        value: '12345678'
                    }
                });
            expect(wrapper.state('confirmPassword')).toEqual('12345678');
        })
    })
})

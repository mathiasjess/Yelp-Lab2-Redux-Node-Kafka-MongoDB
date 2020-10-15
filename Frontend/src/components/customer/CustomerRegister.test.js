import React from 'react'
import {shallow, mount} from 'enzyme';
import CustomerRegister from './CustomerRegister'


it('should return true',async() =>{
    const wrapper = shallow(<CustomerRegister/>)
    const signup = wrapper.find('button').text()

    expect(signup).toBe('Sign Up')
})
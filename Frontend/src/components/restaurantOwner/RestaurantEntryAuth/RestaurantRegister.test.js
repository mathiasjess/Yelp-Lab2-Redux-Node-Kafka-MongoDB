import React from 'react'
import {shallow, mount} from 'enzyme';
import RestaurantRegister from './RestaurantRegister'


it('should return true',async() =>{
    const wrapper = shallow(<RestaurantRegister/>)
    const signup = wrapper.find('button').text()

    expect(signup).toBe('Sign Up')
})

it('label should return location',async() =>{
    const wrapper = shallow(<RestaurantRegister/>)
    const signup = wrapper.find('label').text()

    expect(signup).toBe('Location')
})
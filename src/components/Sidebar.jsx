import React from 'react'
import { Stack } from '@mui/material'
import { categories } from '../utils/constants'
import { Category } from '@mui/icons-material'
const Sidebar = ({selectedCategory, setSelectedCategory}) => (
    <Stack direction="row" sx={
        {
            overflowY:" auto",
            height: {sx: "auto", md: '95%'},
            flexDirection: {md:'column'}
        }
    }
    >
        {categories.map((Category)=>(
            <button
                onClick={()=> setSelectedCategory(Category.name)}
                className='category-btn' 
                style={{
                        background:Category.name===selectedCategory &&'#FC1503',
                        color: 'white'
                }}
                key ={Category.name}
            >
                <span style={{color: Category.name===selectedCategory?'white':'red',marginRight: '15px'}}>{Category.icon}</span>
                <span style={{opacity: selectedCategory===Category.name?1:0.8}}>{Category.name}</span>

            </button>
        ))}
    </Stack>
)


export default Sidebar
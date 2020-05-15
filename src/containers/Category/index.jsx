import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LeftNav from '../../components/LeftNavigation';
import Content from '../../components/Content';

import './index.scss';

const Category = () => {
    const menuItems = [{
        url: '/fihr/Observation',
        value: 'Observation'
    }, {
        url: '/fihr/Patient',
        value: 'Patient'
    }];

    const columns = {
        Observation: [
            { field: 'id', headerName: 'ID' },
            { field: 'status', headerName: 'Status' },
            { field: 'code', headerName:'Code'},
            { field: 'reference', headerName:'Reference'}
        ],
        Patient: [
            { field: 'id', headerName: 'ID' },
            { field: 'name', headerName: 'Name' },
            { field: 'gender', headerName: 'Gender' },
            { field: 'birthDate', headerName: 'BirthDate' }
            
            
        ]
    }

    const { category } = useParams();
    const [data, setData] = useState([]);
    const [categoryId, setCategoryId] = useState([]);
    const [offset, setOffset] = useState(20);
    const [inFlight, setInFlight] = useState(false);
    const count = 20;

    const baseUrl = 'http://hapi.fhir.org/baseR4';

    const fetchNext = async () => {
        if(!inFlight) {
            setInFlight(true);
            const dataObj = await fetch(`${baseUrl}?_getpages=${categoryId}&_pretty=true&_count=${count}&_getpagesoffset=${offset + count}&_bundletype=searchset&_format=json`);
            const response = await dataObj.json();
            const list = getList(category, response.entry);
            setOffset(offset+count);
            setData(list);
            setInFlight(false);
        }
    };

    const fetchPrev = async () => {
        if(!inFlight) {
            setInFlight(true);
            const dataObj = await fetch(`${baseUrl}?_getpages=${categoryId}&_pretty=true&_count=${count}&_getpagesoffset=${offset - count}&_bundletype=searchset&_format=json}`);
            const response = await dataObj.json();
            const list = getList(category, response.entry);
            setOffset(offset-count);
            setData(list);
            setInFlight(false);
        }
    };

    const getList = (category, response) => {
       if(category === 'Observation'){
        return response.map((item) => {
            return {
                id: item.resource.id,
                status: item.resource.status,
                name: item.resource.name && item.resource.name[0].family,
                code: item.resource.code.text,
                reference:item.resource.subject.reference,
            }
        })
    }else{
        return response.map((item) => {
            return {
                id: item.resource.id,
                name: item.resource.name && item.resource.name[0].family,
                gender:item.resource.gender,
                birthDate: item.resource.birthDate
            }
        })
    } 
    };

    useEffect(() => {
        (async () => {
          const intiialCategory = await fetch(`${baseUrl}/${category}?_format=json&_pretty=true`);
          const intiialCategoryResponse = await intiialCategory.json();
          setCategoryId(intiialCategoryResponse.id);
          const dataObj = await fetch(`${baseUrl}?_getpages=${intiialCategoryResponse.id}&_format=json&_count=${count}&_getpageoffset=${0}&_pretty=true&_bundletype=searchset`);
          const response = await dataObj.json();
          const list = getList(category, response.entry);
          setOffset(0);
          setData(list);
        })();
      }, [category]);

    return (
        <>
            <div className="page-container">
                <LeftNav menuItems={menuItems}/>
            </div>
            <div className="content-holder">
                {
                    data.length &&
                    <Content columns={columns[category]} records={data} fetchPrev={fetchPrev} fetchNext={fetchNext} offset/>
                }
            </div>
            
        </>
    );  
};

export default Category;
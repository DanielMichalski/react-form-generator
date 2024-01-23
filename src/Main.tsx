import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./conteiners/Layout/Layout";
import FormElementsGenerator from "./conteiners/FormElementsGenerator/FormElementsGenerator";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <FormElementsGenerator headerText="React Form Generator"/>
            }
        ]
    }
])

function Main() {
    return <RouterProvider router={router}/>
}

export default Main;

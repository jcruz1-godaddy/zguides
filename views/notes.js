import React from 'react';
import Head from '../client/src/components/head';
import '@ux/icon/database/index.css';

export const IndexPage = () => (
    <div className='container m-t-3 main-content'>
        <Head title='ZGuides - Home'/>
        <div className='row'>
            <div className='card ux-card'>
                <div className='card-block'>
                    <div className='card-title'>
                        <h1 className='p-t-1'>ZGuides</h1>
                        <p className='description'>To access the tools, please join the AD group: <b>GD</b></p>
                        <p className='description'>Please reach out to Slack channel #ZGuides-help if you need any help.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default IndexPage;

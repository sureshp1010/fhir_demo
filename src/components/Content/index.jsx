import React from 'react';
import { AgGridReact as Grid } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './index.scss';

const Content = ({ columns, records, fetchPrev, fetchNext, offset }) => {
    return (
        <div className="pageContent">
            <div
				className="ag-theme-balham grid"
			>
                <Grid 
                    columnDefs={columns}
                    rowData={records}
                />
            </div>
            <div className="button-group">
                <button className="button-prev" disabled={offset === 0} onClick={fetchPrev}>Prev</button>
                <button className="button-next" onClick={fetchNext}>Next</button>
            </div>
        </div>
    );
};

export default Content;
import React from 'react'
import dayjs from 'dayjs';
import advanceFormat from 'dayjs/plugin/advancedFormat';

import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);
    dayjs.extend(advanceFormat);
    const activeDate = dayjs( active.date );

    const handleSave = () => {
        dispatch( startSaveNote( active ) );
    }
    
    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            dispatch( startUploading( file ) );
        }
    }
    

    return (
        <div className="notes__appbar">
            <span>{`${ activeDate.format('MMMM Do') }, ${ activeDate.format('YYYY') }`}</span>

            <input
                id="fileSelector"
                type="file"
                name="file"
                hidden
                onChange={ handleFileChange }
            />

            <div>
                <button
                    className="btn"
                    onClick={ handlePictureClick }
                >
                    Picture
                </button>

                <button
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
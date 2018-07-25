import React from 'react';

import Link from '../../Link';

import '../style.css';

const RepositoryItem = (props) => (
    <div>
        <div className="RepositoryItem-title">
            <h2>
                <Link href={props.url}>{props.name}</Link>
            </h2>

            <div className="RepositoryItem-title-action">
                {props.stargazers.totalCount} Stars
            </div>
        </div>

        <div className="RepositoryItem-description">
            <div className="RepositoryItem-description-info" dangerouslySetInnerHTML={{ __html: props.descriptionHTML }} />
            <div className="RepositoryItem-description-details">
                <div>
                    {
                        props.primaryLanguage && (<span>Language: { props.primaryLanguage.name }</span>)
                    }
                </div>
                <div>
                    {
                        props.owner && (<span>Owner: <a href={props.owner.url}>{props.owner.login}</a></span>)
                    }
                </div>
            </div>
        </div>
    </div>
);

export default RepositoryItem;
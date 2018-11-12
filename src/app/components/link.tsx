import * as React from 'react';
import { Link } from 'react-router-dom';

interface UniversalLinkProps {
    to: string,
    className: string,
    children: JSX.Element | string
}

/**
 * Check is extenral url or in-app location 
 * @param {string} url Url addr
 */
const isExternal = (url) => url.indexOf('http') === 0;

export class UniversalLink extends React.Component<UniversalLinkProps> {
    render() {
        const { to, className } = this.props;
        return isExternal(to)
            ? <a href={to} className={className} target="_blank">{this.props.children}</a>
            : <Link to={to} className={className}>{this.props.children}</Link>
    }
}


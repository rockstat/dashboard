import * as React from "react"
import * as PropTypes from "prop-types"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { irBlack } from 'react-syntax-highlighter/styles/hljs';

interface PrismCodeProps {
  async: boolean,
  language: string,
  children: any,
  component?: any,
}


export class PrismCode extends React.PureComponent<PrismCodeProps> {

  _domNode: Element

  static propTypes = {
    async: PropTypes.bool,
    language: PropTypes.string,
    children: PropTypes.any,
    component: PropTypes.node,
  }

  static defaultProps = {
    component: `code`,
  }

  componentDidMount() {
    this._hightlight()
  }

  componentDidUpdate() {
    this._hightlight()
  }

  _hightlight() {
    // Prism.highlightElement(this._domNode, this.props.async)
  }

  _handleRefMount = domNode => {
    this._domNode = domNode
  }

  render() {
    const { language, component: Wrapper, children } = this.props;
    return (
      <SyntaxHighlighter language={language} PreTag={"div"} style={irBlack}>{children}</SyntaxHighlighter>
    )
  }
}

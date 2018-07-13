import React, {Component} from "react";
import {Pagination, PageItem, PageLink} from "mdbreact"
import "../pagination/pagination.css";

class CustomPagination extends Component {
    constructor(props) {
        super(props)

        this.state = {
            actualPageNumber: this.props.actualPageNumber
        }
    }

    updatePage(indexValue) {
        this.setState({actualPageNumber: indexValue});
        this.props.updatePage(indexValue);
    }

    createLongPagination() {
        const numberOfPages = this.props.pages.length;
        const pageNumber = this.state.actualPageNumber;

        return (
            <React.Fragment>
                {this.props.pages.map((page, index) => {
                        if (pageNumber > 3 && index === 0) {
                            return (
                            <PageItem 
                                key={`pageItem-${index}`}
                                className={(this.state.actualPageNumber === index+1) ? "active" : ""}
                                onClick={this.updatePage.bind(this, index+1)}
                                >
                                <PageLink key={`pageLink-${index}`} className="page-link">
                                    {index + 1}
                                </PageLink>
                            </PageItem>
                            )
                        }
                        else if (!(index === numberOfPages - 1) && index + 1 === pageNumber + 3 || index + 1 === pageNumber - 3) return <span className="dotted-pagination">  ...  </span>
                        else if (!(index === numberOfPages - 1) && index + 1 > pageNumber + 3 || index + 1 < pageNumber - 3) return null;
                        else if (pageNumber > numberOfPages - 5  && index === numberOfPages - 1) {
                            console.log(index)
                            return (
                                <PageItem 
                                    key={`pageItem-${index}`}
                                    className={(this.state.actualPageNumber === index+1) ? "active" : ""}
                                    onClick={this.updatePage.bind(this, index+1)}
                                    >
                                    <PageLink key={`pageLink-${index}`} className="page-link">
                                        {index + 1}
                                    </PageLink>
                                </PageItem>
                                )
                        }
                        else {
                            return (
                            <PageItem 
                                key={`pageItem-${index}`}
                                className={(this.state.actualPageNumber === index+1) ? "active" : ""}
                                onClick={this.updatePage.bind(this, index+1)}
                                >
                                <PageLink key={`pageLink-${index}`} className="page-link">
                                    {index + 1}
                                </PageLink>
                            </PageItem>
                            )
                        }
                    }
                )}
            </React.Fragment>
        );
    }

    createShortPagination() {
        return (
            <React.Fragment>
                {this.props.pages.map((page, index) => {
                    return (
                        <PageItem 
                            key={`pageItem-${index}`}
                            className={(this.state.actualPageNumber === index+1) ? "active" : ""}
                            onClick={this.updatePage.bind(this, index+1)}
                            >
                            <PageLink key={`pageLink-${index}`} className="page-link">
                                {index + 1}
                            </PageLink>
                        </PageItem>
                        )
                })}
            </React.Fragment>
        );
    };

    render() {
        return (
            <Pagination className="justify-content-center mb-2">
                    
                {(this.props.pages.length > 10) ? this.createLongPagination() : this.createShortPagination()}

            </Pagination>
        );
    }
}

export default CustomPagination
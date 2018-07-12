import React, {Comment} from "react";
import {Pagination, PageItem, PageLink} from "mdbreact"

class CustomPagination extends Comment {
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
        return (
            <React.Fragment>
                {this.state.pages.map((page, index) => {
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
                        else if (index + 1 === pageNumber + 3 || index + 1 === pageNumber - 3) return <span>  ...  </span>
                        else if (!index === numberOfPages - 1 && index + 1 > pageNumber + 3 || index + 1 < pageNumber - 3) return null;
                        else if (pageNumber < numberOfPages - 3  && index === numberOfPages - 1) {
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
                {this.state.pages.map((page, index) => {
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
            <Pagination className="justify-content-center">
                    
                {(this.props.numberOfPages > 10) ? this.createLongPagination() : this.createShortPagination()}

            </Pagination>
        );
    }
}

export default CustomPagination
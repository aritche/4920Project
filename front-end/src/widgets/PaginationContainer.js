import React, { Component } from 'react';
import { Pagination, Divider, Grid } from 'semantic-ui-react';

export default class PaginationContainer extends Component {
    render() {
        return (
            <div>
                { this.props.totalItems > this.props.itemsPerPage && this.props.showDivider &&
                    <Grid textAlign='center' style={{marginTop: '5px'}}> 
                        <Divider style={{width: '30%', marginBottom: '5px'}}/>
                    </Grid>
                }
                { this.props.totalItems > this.props.itemsPerPage &&
                <div className="pagination-container">
                    <Pagination defaultActivePage={this.props.defaultActivePage ? this.props.defaultActivePage : 1} 
                        totalPages={Math.ceil(this.props.totalItems/this.props.itemsPerPage)} 
                        onPageChange={this.props.handlePaginationChange}
                    />
                </div>
                }
            </div>
        )
    }
}

// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React, { Component } from 'react';
import '@gooddata/react-components/styles/css/main.css';

import { ColumnChart } from '@gooddata/react-components';

const grossProfitMeasure = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/6877';
const dateAttributeInMonths = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2142';
const dateAttribute = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2180';

class App extends Component {

    state = {
        options: [
            {
                name: 'January',
                value: '01',
            },
            {
                name: 'February',
                value: '02',
            },
            {
                name: 'March',
                value: '03',
            },
            {
                name: 'April',
                value: '04',
            },
            {
                name: 'May',
                value: '05',
            },
            {
                name: 'June',
                value: '06',
            },
            {
                name: 'July',
                value: '07',
            },
            {
                name: 'August',
                value: '08',
            },
            {
                name: 'September',
                value: '09',
            },
            {
                name: 'October',
                value: '10',
            },
            {
                name: 'November',
                value: '11',
            },
            {
                name: 'December',
                value: '12',
            }
        ],
        value: '01',
    };

    getLastDay(year, month) {
        const date = new Date((new Date(year, month, 0)));
        return date.getDate();
    };

    getMonthFilter() {
        return {
            absoluteDateFilter: {
                dataSet: {
                    uri: dateAttribute
                },
                from: `2016-${this.state.value}-01`,
                to: `2016-${this.state.value}-${this.getLastDay(2016, this.state.value)}`
            }

        }
    }

    getMeasures() {
        return [
            {
                measure: {
                    localIdentifier: 'm1',
                    definition: {
                        measureDefinition: {
                            item: {
                                uri: grossProfitMeasure
                            }
                        }
                    },
                    alias: '$ Gross Profit'
                }
            }
        ]
    }

    getViewBy() {
        return {
            visualizationAttribute:
            {
                displayForm: {
                    uri: dateAttributeInMonths
                },
                localIdentifier: 'a1'
            }
        }
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    };



    renderDropdown() {
        const { options, value } = this.state;
        return (

            <select onChange={this.handleChange} value={value}>
            {options.map(item => (
                <option key={item.value} value={item.value}>
                    {item.name}
                </option>
            ))}
            </select>
        )
    }

    render() {
        const projectId = 'xms7ga4tf3g3nzucd8380o2bev8oeknp';
        const filters = [this.getMonthFilter()];
        const measures = this.getMeasures();
        const viewBy = this.getViewBy();

        return (
            <div className="App">
                <h1>$ Gross Profit in month {this.renderDropdown()} 2016</h1>
                <div>
                    <ColumnChart
                        measures={measures}
                        filters={filters}
                        projectId={projectId}
                    />
                </div>
                <h1>$ Gross Profit - All months</h1>
                <div>
                    <ColumnChart
                        measures={measures}
                        viewBy={viewBy}
                        projectId={projectId}
                    />
                </div>
            </div>
        );
    }
}

export default App;

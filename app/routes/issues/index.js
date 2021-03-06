import { PropertySelection, KeySelection } from 'cx/ui';
import { DateTimeField, FlexRow, Grid, Link, Menu, openContextMenu, Pagination, Select, TextField, Button, Section, LookupField, MenuItem, Icon } from 'cx/widgets';
import Controller from './Controller';

export default <cx>
    <main controller={Controller} >

        <FlexRow spacing style="margin-left:10px; margin-top:10px">
            <FlexRow spacing>
                <LookupField
                    label="Project"
                    value-bind="$page.selectedProjectId"
                    options-bind="$page.projects"
                    optionTextField="name"
                    style="margin-right: 100px;"
                    placeholder="All Projects"
                />
                <LookupField
                    label="Assignee"
                    value-bind="$page.selectedAssigneeId"
                    options-bind="$page.assignees"
                    optionTextField="fullName"
                    placeholder="All Assignees"
                />
            </FlexRow>
            <div style=" position: absolute; right: 0; padding:10px 10px 10px 0px">
                <Link onClick='addIssue' style="font-size:15px" href="#" > Create issue <i style="padding-left:10px" class="fa fa-plus" /></Link></div>
        </FlexRow>
        <Grid
            records-bind="$page.records"
            onRowDoubleClick="openDetails"
            selection={{ type: KeySelection, bind: "$page.selectedIssue" }}
            style={{ padding: "10px" }}
            mod="bordered"
            onRowContextMenu={(e, { store }) => openContextMenu(e, <cx>
                <Menu controller={Controller}>
                    <a style="padding-left:10px" onClick="edit" href="#"><i style="padding-right:5px" class="fas fa-pencil-alt"></i> Edit</a>
                    <a style="padding-left:10px" onClick="delete" href="#"><i style="padding-right:5px" class="fas fa-trash-alt"></i> Delete</a>
                </Menu>
            </cx>, store)}
            columns={[
                {
                    header1: "Project",
                    header2: {
                        items: (
                            <TextField
                                value-bind="$page.filter.projectName"
                                style="width:100%"
                            />
                        )
                    },
                    field: "projectName",
                    sortable: true
                },
                {
                    header1: "Summary",
                    header2: {
                        items: (
                            <TextField
                                value-bind="$page.filter.title"
                                style="width:100%"
                            />
                        )
                    },
                    items: (
                        <cx>
                            <div text-bind="$record.description" class="ellipsis" style="width:200px " />
                        </cx>
                    ),
                    field: "title"
                }, {
                    header1: "Description",
                    header2: {
                        items: (
                            <TextField
                                value-bind="$page.filter.description"
                            />
                        )
                    },
                    items: (
                        <cx>
                            <div text-bind="$record.description" class="ellipsis" style="width:400px " />
                        </cx>
                    )
                },
                {
                    header1: "Assignee",
                    header2: {
                        items: (
                            <TextField
                                value-bind="$page.filter.assignee"
                                style="width:100%"
                            />
                        )
                    },
                    field: "assigneeFullName",
                    sortable: true
                }, {
                    field: "type",
                    sortable: true,
                    header1: "Type",
                    header2: {
                        allowSorting: false,
                        items: (
                            <TextField
                                value-bind="$page.filter.type"
                                style="width:100%"
                            />
                        )
                    }
                },
                {
                    header1: "State",
                    header2: {
                        items: (
                            <TextField
                                value-bind="$page.filter.state"
                                style="width:100%"
                            />
                        )
                    },
                    field: "state",
                    sortable: true
                },
                {
                    header1: "Priority",
                    style: "width:50px",
                    header2: {
                        items: (
                            <TextField
                                value-bind="$page.filter.priority"
                                style="width:100%"
                            />
                        )
                    },
                    field: "priority",
                    sortable: true,
                    items: <cx>
                        <span text-bind="$record.priority" class-tpl="priority {[{$record.priority}.toLowerCase()]}"></span>
                    </cx>
                    // mod: tpl("cxm-priority {[{$record.priority}.toLowerCase()]}")
                },
                {
                    header1: "Due date",
                    format: 'datetime',
                    header2: {
                        items: (
                            <DateTimeField
                                value-bind="$page.filter.duedate"
                                style="width:100%"
                            />
                        )
                    },
                    field: "duedate",
                },
                {
                    header1: "Version",
                    header2: {
                        items: (
                            <TextField
                                value-bind="$page.filter.version"
                                style="width:100%"
                            />
                        )
                    },
                    field: "version",
                    sortable: true
                }
            ]}
        />
        <div style={{ margin: "10px 10px 0px", float: "right" }}>
            <Pagination page-bind="$page.page" pageCount-bind="$page.pageCount" />
            <Select value-bind="$page.pageSize" style={{ marginLeft: "10px", float: "right" }}>
                <option value="5">5</option>
                <option value={10}>10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </Select>
        </div>
    </main>
</cx >
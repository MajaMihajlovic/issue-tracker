import { PropertySelection } from 'cx/ui';
import { DateTimeField, FlexRow, Grid, Link, Menu, openContextMenu, Pagination, Select, TextField, Button, Section, LookupField } from 'cx/widgets';
import Controller from './Controller';

export default <cx>
    <main controller={Controller} >
        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item">
                    <Link href="~/issues/">Issues</Link>
                </li>
            </ul>
        </div>
        <FlexRow spacing style=" width: 100%; margin-left:10px; margin-top:10px">
            <FlexRow spacing>
                <LookupField
                    label="Project"
                    value-bind="$page.selectedProjectId"
                    text-bind="$page.selectedProjectName"
                    options-bind="$page.projects"
                /><div style="width:100px"></div>
                <LookupField
                    label="Assignee"
                    value-bind="$page.selectedAssigneeId"
                    text-bind="$page.selectedAssigneeName"
                    options-bind="$page.assignees"
                />
            </FlexRow>


            <Button
                style="border-radius:25%; padding:5px; position: absolute; right: 20px; font-size:20px"
                onClick="addIssue"

            ><i class="fa fa-plus" /></Button>
        </FlexRow>
        <Grid
            records-bind="$page.records"
            selection={{ type: PropertySelection, bind: "$page.selection", multiple: false }}
            style={{ width: "100%", padding: "10px" }}
            mod="bordered"
            lockColumnWidths
            onRowContextMenu={(e, { store }) => openContextMenu(e, <cx>
                <Menu controller={Controller}>
                    <a style="padding-left:10px" onClick="edit" href="#"><i style="padding-right:5px" class="fas fa-pencil-alt" />  Edit</a>
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
                },
                {
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
                    header1: "Title",
                    header2: {
                        items: (
                            <TextField
                                value-bind="$page.filter.title"
                                style="width:100%"
                            />
                        )
                    },
                    field: "title"
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
        <div style={{ marginTop: "40px", marginRight: "20px", float: "right" }}>
            <Pagination page-bind="$page.page" pageCount-bind="$page.pageCount" />
            <Select value-bind="$page.pageSize" style={{ marginLeft: "20px", float: "right" }}>
                <option value="5">5</option>
                <option value={10}>10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </Select>
        </div>
    </main>
</cx >
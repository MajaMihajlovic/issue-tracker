import { Text, Link, Repeater, MenuItem, Menu, Submenu, openContextMenu, MonthField, Section, FlexRow, TextField, Button } from 'cx/widgets';
import { FirstVisibleChildLayout, PropertySelection, Restate } from 'cx/ui';
import Controller from './Controller';
import "./index.scss"
import { openIssueWindow } from '../../components/issueWindow';

export default <cx>
    <main controller={Controller} class="b-list">
        <Section mod="card">
            <FlexRow spacing>
                <TextField
                    value-bind="search.query"
                    placeholder="Search..."
                    style="font-size:30px; width: 100%; max-width: 720px; height:35px"
                    icon="search"
                /><div style=" position: absolute; right: 0;">
                    <Link onClick='addProject' style="font-size:15px" href="#" > Add project <i style="padding-left:10px" class="fa fa-plus" /></Link></div>
            </FlexRow>
        </Section>
        <div
            class="b-cards"
            layout={FirstVisibleChildLayout}
        >
            <div
                class="e-cards-empty"
                visible-expr="{list.loading}">
                Loading...
            </div>

            <div
                class="e-cards-empty"
                visible-expr="!{list.data} || {list.data}.length == 0"
            >
            </div>

            <Repeater
                records-bind='list.data'
                recordName="$project"
                idField="id"
            >
                <div class="b-card" onContextMenu={(e, { store }) => openContextMenu(e, <cx>
                    <Menu controller={Controller}>
                        <a style="padding-left:10px" onClick="details" href="#"><i style="padding-right:5px" class="fas fa-file-alt"></i>  Details</a>
                        <a style="padding-left:10px" onClick="delete" href="#"><i style="padding-right:5px" class="fas fa-trash-alt"></i>  Delete</a>
                        <a style="padding-left:10px" onClick="finish" href="#"><i style="padding-right:5px" class="fas fa-check"></i>  Mark as finished</a>
                    </Menu>
                </cx>, store)}>
                    <Restate
                        data={{
                            project: { bind: "$project" },
                        }}
                    >
                        <div class="e-card-img" >

                            <img width="100px"
                                src-expr="{project.photoUrl} || '~/app/assets/img/projectManagement.jpg'"
                                alt="Project photo"
                            />
                        </div>
                        <a href-tpl="~/issues?projectId={project.id}" style="text-decoration:none">
                            <div class="e-card-details">
                                <h3 class="e-card-name" text-tpl="{project.name}" />
                                <div style="  white-space: wrap; height: 3.6em; overflow: hidden;  text-overflow: -o-ellipsis-lastline;">
                                    <i class="fa fa-newspaper"></i>
                                    <Text bind="project.description" />
                                </div>
                            </div>
                        </a>
                    </Restate>
                </div>
            </Repeater>
        </div>
    </main>


</cx >
﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<IEnumerable<DemoMVC.Models.GRH_Persona>>" %>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {
            try {
                var textoNoticia = $('.head-noticia').next();
                if (textoNoticia.hasClass('texto-noticia')) {
                    if (textoNoticia.css('display') == 'none') {
                        textoNoticia.slideDown();
                    }
                    else {
                        textoNoticia.slideUp();
                    }
                }
            } catch (ex) {
            }
        });
    </script>
    <div class="contenido-top">
        <div>
            <h1>
                Procesaro Información del Empleado
            </h1>
            <div class="areas-negocios">
                <div class="lista-central">
                    <div class="noticia">
                        <div class="head-noticia">
                            <span class="titulo-noticia">Empleados Aprobados: <%= Model.Count() %></span>
                        </div>
                        <div class="texto-noticia">
                            <table class="table100 table100b">
                                <thead>
                                    <tr>
                                        <th>
                                            <b>Nombres</b>
                                        </th>
                                        <th>
                                            <b>Apellido Paterno</b>
                                        </th>
                                        <th>
                                            <b>Apellido Materno</b>
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <% if (Model != null)
                                       {
                                           foreach (var grhPersona in Model)
                                           {
                                    %>
                                    <tr>
                                        <td>
                                            <%= grhPersona.nombre %>
                                        </td>
                                        <td>
                                            <%= grhPersona.apellidoPaterno %>
                                        </td>
                                        <td>
                                            <%= grhPersona.apellidoMaterno %>
                                        </td>
                                        <td>
                                            <%= Html.ActionLink("Agregar", "DatosAdicionales", new { id = grhPersona.idPersona })%>
                                        </td>
                                    </tr>
                                    <%
                                                       }
                                                   } %>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

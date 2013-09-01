﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<DemoMVC.Models.GRH_Persona>" %>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">            
    <script src="../../Scripts/persona.js" type="text/javascript"></script>
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
                Crear Postulante
                <%= Html.HiddenFor(m=> m.IdPersona) %>
            </h1>
            <div class="areas-negocios">
                <div class="lista-central">
                    <div class="noticia">
                        <div class="head-noticia">
                            <span class="titulo-noticia">Información Personal</span>
                        </div>
                        <div class="texto-noticia">
                            <table>
                                <tr>
                                    <td>
                                        <%= Html.Label("Nombres") %>
                                    </td>
                                    <td>
                                        :
                                    </td>
                                    <td>
                                        <%= Html.TextBoxFor(m => m.Nombre, new { @class = "required" })%>
                                    </td>
                                    <td>
                                    </td>
                                    <td>                                        
                                    </td>
                                    <td>                                        
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <%= Html.Label("Apellido Paterno") %>
                                    </td>
                                    <td>
                                        :
                                    </td>
                                    <td>
                                        <%= Html.TextBoxFor(m => m.ApellidoPaterno, new { @class = "required" })%>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                        <%= Html.Label("Apellido Materno") %>
                                    </td>
                                    <td>
                                        :
                                    </td>
                                    <td>
                                        <%= Html.TextBoxFor(m => m.ApellidoMaterno, new { @class = "required" })%>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <%= Html.Label("Estado Civil") %>
                                    </td>
                                    <td>
                                        :
                                    </td>
                                    <td>
                                        <%= Html.DropDownListFor(m => m.IdEstadoCivil, (IEnumerable<SelectListItem>)ViewData["EstadoCivil"], new { @class = "required" })%>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                        Sexo
                                    </td>
                                    <td>
                                        :
                                    </td>
                                    <td>
                                        <%= Html.RadioButtonFor(m => m.Sexo, true, new { @class = "required" })%>
                                        Masculino
                                        <%= Html.RadioButtonFor(m => m.Sexo, false, new { @class = "required" })%>
                                        Femenino
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Dirección
                                    </td>
                                    <td>
                                        :
                                    </td>
                                    <td>
                                        <%= Html.TextBoxFor(m=>m.Direccion)%>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                        Pais de Residencia
                                    </td>
                                    <td>
                                        :
                                    </td>
                                    <td>
                                        <%= Html.DropDownListFor(m => m.IdPaisResidencia, (IEnumerable<SelectListItem>)ViewData["Pais"], new { @class = "required" })%>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Fecha de Nacimiento
                                    </td>
                                    <td>
                                        :
                                    </td>
                                    <td>
                                        <%= Html.TextBoxFor(m=> m.FechaNacimiento, new {@type ="date",@class="required"}) %>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                        <%= Html.Label("Pais de Nacimiento") %>
                                    </td>
                                    <td>
                                        :
                                    </td>
                                    <td>
                                        <%= Html.DropDownListFor(m => m.IdPaisNacionalidad, (IEnumerable<SelectListItem>)ViewData["Pais"], new { @class = "required" })%>
                                    </td>
                                </tr>      
                                 <tr>
                                    <td>
                                        Disponibilidad
                                    </td>
                                    <td>
                                        :
                                    </td>
                                    <td>
                                        <%= Html.TextBoxFor(m=> m.GRH_Postulante.FirstOrDefault().Disponibilidad, new {@class="required"}) %>
                                    </td>
                                    <td>
                                    </td>
                                    <td>                                        
                                    </td>
                                    <td>                                        
                                    </td>
                                    <td>                                        
                                    </td>
                                </tr>                                                      
                            </table>                            
                        </div>
                    </div>               
                    
                    <a id="btnEnviar" class="button" href="javascript:;">Enviar</a>
                </div>
            </div>
        </div>
    </div>     
</asp:Content>

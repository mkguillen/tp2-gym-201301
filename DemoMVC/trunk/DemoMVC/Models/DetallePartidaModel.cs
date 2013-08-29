﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GYM.SIC.GPC.Models
{
    public class DetallePartidaModel
    {
        public int ID { get; set; }
        public string Nombre { get; set; }

        public string UM { get; set; }
        public decimal Cantidad { get; set; }
        public decimal Precio { get; set; }
    }
}
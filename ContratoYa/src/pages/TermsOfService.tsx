import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-navy-800 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>

      <h1 className="text-3xl font-serif font-bold text-navy-800 mb-2">
        Condiciones de Uso
      </h1>
      <p className="text-sm text-gray-400 mb-10">
        Ultima actualizacion: 13 de abril de 2026
      </p>

      <div className="prose prose-navy max-w-none space-y-8 text-gray-700 text-sm leading-relaxed">

        {/* 1. ACCEPTANCE */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">1. Aceptacion de las condiciones</h2>
          <p>
            Al acceder o utilizar la plataforma ContratoYa (en adelante, "el Servicio"), usted acepta
            quedar vinculado por las presentes Condiciones de Uso. Si no esta de acuerdo con alguna
            de estas condiciones, no utilice el Servicio.
          </p>
        </section>

        {/* 2. NOT A LAW FIRM */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">2. ContratoYa NO es un despacho de abogados</h2>
          <p>
            ContratoYa es una <strong>herramienta de preparacion de documentos automatizada</strong>.
            ContratoYa NO es un despacho de abogados, NO ejerce la abogacia, NO proporciona
            asesoramiento juridico y NO es un sustituto de los servicios de un abogado colegiado.
          </p>
          <p className="mt-3">
            El uso del Servicio no crea ninguna relacion abogado-cliente entre usted y ContratoYa.
            Los documentos generados son <strong>plantillas orientativas</strong> basadas en la
            informacion que usted proporciona y no constituyen asesoramiento juridico personalizado.
          </p>
          <p className="mt-3 font-medium text-navy-800">
            Le recomendamos encarecidamente que consulte con un abogado colegiado antes de
            firmar o utilizar cualquier documento generado por el Servicio.
          </p>
        </section>

        {/* 3. DESCRIPTION */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">3. Descripcion del servicio</h2>
          <p>
            ContratoYa ofrece un servicio de generacion automatizada de documentos legales
            (contratos, facturas, presupuestos, acuerdos de confidencialidad, contratos de alquiler
            y politicas de privacidad) mediante formularios de preguntas y plantillas predefinidas.
          </p>
          <p className="mt-3">
            El Servicio genera documentos en formato PDF basandose exclusivamente en la informacion
            proporcionada por el usuario. ContratoYa no verifica la veracidad, exactitud ni idoneidad
            de la informacion introducida.
          </p>
        </section>

        {/* 4. USER RESPONSIBILITY */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">4. Responsabilidad del usuario</h2>
          <p>Usted reconoce y acepta que:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Es el <strong>unico responsable</strong> de revisar, verificar y personalizar cualquier documento generado antes de su uso.</li>
            <li>Los documentos generados son <strong>borradores orientativos</strong> que pueden contener errores, omisiones o imprecisiones.</li>
            <li>Debe obtener <strong>asesoramiento juridico independiente</strong> antes de firmar o ejecutar cualquier documento generado.</li>
            <li>Es responsable de asegurar que los documentos cumplen con la normativa aplicable en su jurisdiccion especifica.</li>
            <li>La informacion que introduce en el Servicio es veraz, completa y actualizada.</li>
            <li>No utilizara el Servicio para fines ilegales, fraudulentos o contrarios a la buena fe.</li>
          </ul>
        </section>

        {/* 5. AS IS */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">5. Exencion de garantias</h2>
          <p className="uppercase font-semibold text-navy-800 bg-gray-50 p-4 rounded-lg">
            EL SERVICIO Y TODOS LOS DOCUMENTOS GENERADOS SE PROPORCIONAN "TAL CUAL" ("AS IS")
            Y "SEGUN DISPONIBILIDAD" ("AS AVAILABLE"), SIN GARANTIAS DE NINGUN TIPO, YA SEAN
            EXPRESAS O IMPLICITAS, INCLUYENDO, PERO NO LIMITANDOSE A, LAS GARANTIAS IMPLICITAS
            DE COMERCIABILIDAD, IDONEIDAD PARA UN FIN PARTICULAR Y NO INFRACCION.
          </p>
          <p className="mt-3">
            ContratoYa no garantiza que:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Los documentos generados sean legalmente validos, completos o adecuados para su proposito especifico.</li>
            <li>Las plantillas esten actualizadas con la ultima legislacion vigente en todo momento.</li>
            <li>El Servicio funcione de forma ininterrumpida, segura o libre de errores.</li>
            <li>Los documentos generados cumplan con los requisitos legales especificos de todas las jurisdicciones.</li>
          </ul>
        </section>

        {/* 6. LIMITATION OF LIABILITY */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">6. Limitacion de responsabilidad</h2>
          <p className="uppercase font-semibold text-navy-800 bg-gray-50 p-4 rounded-lg">
            EN LA MAXIMA MEDIDA PERMITIDA POR LA LEY APLICABLE, CONTRATOYA, SUS DIRECTORES,
            EMPLEADOS, AGENTES Y AFILIADOS NO SERAN RESPONSABLES DE NINGUN DANO INDIRECTO,
            INCIDENTAL, ESPECIAL, CONSECUENTE O PUNITIVO, NI DE CUALQUIER PERDIDA DE BENEFICIOS
            O INGRESOS, YA SEA DE FORMA DIRECTA O INDIRECTA, NI DE CUALQUIER PERDIDA DE DATOS,
            USO, FONDO DE COMERCIO U OTRAS PERDIDAS INTANGIBLES, DERIVADAS DE:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Su uso o incapacidad de uso del Servicio.</li>
            <li>Cualquier documento generado por el Servicio.</li>
            <li>Cualquier error, omision o imprecision en los documentos generados.</li>
            <li>Su confianza en cualquier documento sin revision legal independiente.</li>
            <li>Acceso no autorizado a sus datos o su transmision.</li>
          </ul>
          <p className="mt-3">
            <strong>Limite maximo de responsabilidad:</strong> En cualquier caso, la responsabilidad
            total y acumulada de ContratoYa no excedera el importe total pagado por usted al
            Servicio durante los doce (12) meses inmediatamente anteriores al evento que origino
            la reclamacion, o cien euros (100 EUR), el que sea mayor.
          </p>
        </section>

        {/* 7. INDEMNIFICATION */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">7. Indemnizacion</h2>
          <p>
            Usted acepta indemnizar, defender y mantener indemne a ContratoYa, sus directores,
            empleados, agentes y afiliados frente a cualquier reclamacion, dano, perdida,
            responsabilidad, coste y gasto (incluidos honorarios razonables de abogados)
            derivados de o relacionados con:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Su uso del Servicio.</li>
            <li>Su confianza en cualquier documento generado sin revision legal independiente.</li>
            <li>Cualquier incumplimiento de estas Condiciones de Uso.</li>
            <li>Cualquier reclamacion de terceros derivada de documentos generados mediante el Servicio.</li>
          </ul>
        </section>

        {/* 8. SUBSCRIPTIONS AND PAYMENTS */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">8. Suscripciones y pagos</h2>
          <p>
            ContratoYa ofrece un plan gratuito y planes de suscripcion de pago. Los pagos se
            procesan de forma segura a traves de Stripe. Al suscribirse a un plan de pago,
            usted acepta las condiciones de pago correspondientes.
          </p>
          <p className="mt-3">
            Las suscripciones se renuevan automaticamente al final de cada periodo salvo
            cancelacion previa. Puede cancelar su suscripcion en cualquier momento. No se
            realizaran reembolsos por periodos parciales ya iniciados.
          </p>
        </section>

        {/* 9. INTELLECTUAL PROPERTY */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">9. Propiedad intelectual</h2>
          <p>
            Los documentos que usted genera mediante el Servicio le pertenecen. Sin embargo,
            las plantillas, el diseno, el codigo fuente y los demas elementos del Servicio son
            propiedad de ContratoYa y estan protegidos por las leyes de propiedad intelectual.
          </p>
        </section>

        {/* 10. DATA PROTECTION */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">10. Proteccion de datos</h2>
          <p>
            El tratamiento de sus datos personales se rige por nuestra{' '}
            <Link to="/privacy" className="text-success-600 hover:text-success-700 underline">
              Politica de Privacidad
            </Link>
            , que forma parte integrante de estas Condiciones de Uso.
          </p>
        </section>

        {/* 11. DISPUTE RESOLUTION */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">11. Resolucion de conflictos y legislacion aplicable</h2>
          <p>
            Estas Condiciones de Uso se rigen por la legislacion espanola. Para cualquier
            controversia derivada del uso del Servicio, las partes se someten a la jurisdiccion
            de los juzgados y tribunales de Madrid (Espana), con renuncia expresa a cualquier
            otro fuero que pudiera corresponderles.
          </p>
          <p className="mt-3">
            No obstante, si usted es consumidor en el sentido del Real Decreto Legislativo
            1/2007, le corresponderan los juzgados de su domicilio.
          </p>
          <p className="mt-3">
            Antes de acudir a la via judicial, las partes intentaran resolver amistosamente
            cualquier controversia mediante negociacion directa durante un plazo minimo de
            treinta (30) dias.
          </p>
        </section>

        {/* 12. MODIFICATIONS */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">12. Modificaciones</h2>
          <p>
            ContratoYa se reserva el derecho de modificar estas Condiciones de Uso en cualquier
            momento. Las modificaciones entraran en vigor en el momento de su publicacion en el
            Servicio. El uso continuado del Servicio tras la publicacion de las modificaciones
            implica su aceptacion.
          </p>
          <p className="mt-3">
            Para cambios sustanciales, notificaremos a los usuarios registrados por correo
            electronico con al menos quince (15) dias de antelacion.
          </p>
        </section>

        {/* 13. TERMINATION */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">13. Terminacion</h2>
          <p>
            ContratoYa puede suspender o cancelar su acceso al Servicio en cualquier momento y
            por cualquier motivo, incluyendo el incumplimiento de estas Condiciones de Uso.
            Usted puede dejar de utilizar el Servicio en cualquier momento.
          </p>
          <p className="mt-3">
            Tras la terminacion, las clausulas de exencion de garantias, limitacion de
            responsabilidad e indemnizacion sobreviviran.
          </p>
        </section>

        {/* 14. SEVERABILITY */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">14. Clausula de salvaguarda</h2>
          <p>
            Si cualquier disposicion de estas Condiciones de Uso fuera declarada nula o
            inaplicable, dicha disposicion se interpretara de la manera mas favorable posible
            para reflejar la intencion original de las partes, y las demas disposiciones
            continuaran en pleno vigor y efecto.
          </p>
        </section>

        {/* 15. CONTACT */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">15. Contacto</h2>
          <p>
            Para cualquier consulta relacionada con estas Condiciones de Uso, puede contactarnos
            en: <strong>legal@contratoya.es</strong>
          </p>
        </section>

      </div>
    </div>
  )
}

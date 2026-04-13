import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function AppPrivacyPolicy() {
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
        Politica de Privacidad
      </h1>
      <p className="text-sm text-gray-400 mb-10">
        Ultima actualizacion: 13 de abril de 2026
      </p>

      <div className="prose prose-navy max-w-none space-y-8 text-gray-700 text-sm leading-relaxed">

        {/* 1. RESPONSIBLE */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">1. Responsable del tratamiento</h2>
          <p>
            El responsable del tratamiento de sus datos personales es ContratoYa
            (en adelante, "nosotros" o "el Responsable").
          </p>
          <p className="mt-2">
            Correo de contacto: <strong>privacidad@contratoya.es</strong>
          </p>
        </section>

        {/* 2. DATA COLLECTED */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">2. Datos personales que recopilamos</h2>
          <p>Recopilamos los siguientes tipos de datos:</p>

          <h3 className="text-base font-medium text-navy-800 mt-4 mb-2">2.1 Datos de registro</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Direccion de correo electronico</li>
            <li>Contrasena (almacenada de forma cifrada)</li>
          </ul>

          <h3 className="text-base font-medium text-navy-800 mt-4 mb-2">2.2 Datos del perfil de autonomo</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nombre completo o razon social</li>
            <li>NIF/CIF</li>
            <li>Direccion, ciudad y codigo postal</li>
            <li>Actividad IAE</li>
            <li>Telefono y correo electronico profesional</li>
          </ul>

          <h3 className="text-base font-medium text-navy-800 mt-4 mb-2">2.3 Datos de contactos (clientes)</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nombre, NIF/CIF, direccion, correo y telefono de sus clientes</li>
          </ul>

          <h3 className="text-base font-medium text-navy-800 mt-4 mb-2">2.4 Datos de documentos generados</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Toda la informacion introducida en los formularios de generacion de documentos</li>
            <li>Tipo de documento, fecha de creacion y metadatos asociados</li>
          </ul>

          <h3 className="text-base font-medium text-navy-800 mt-4 mb-2">2.5 Datos de pago</h3>
          <p>
            Los datos de pago (tarjeta de credito, datos bancarios) son procesados exclusivamente
            por Stripe y nunca son almacenados en nuestros servidores. Consulte la{' '}
            <a href="https://stripe.com/es/privacy" target="_blank" rel="noopener noreferrer" className="text-success-600 hover:text-success-700 underline">
              Politica de Privacidad de Stripe
            </a>.
          </p>

          <h3 className="text-base font-medium text-navy-800 mt-4 mb-2">2.6 Datos tecnicos</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Direccion IP, tipo de navegador y dispositivo</li>
            <li>Cookies funcionales y de sesion</li>
          </ul>
        </section>

        {/* 3. PURPOSE AND LEGAL BASIS */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">3. Finalidad y base juridica del tratamiento</h2>
          <table className="w-full border-collapse text-sm mt-2">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-navy-800">Finalidad</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-navy-800">Base juridica (RGPD Art. 6)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Gestion de su cuenta de usuario</td>
                <td className="border border-gray-200 px-4 py-2">Ejecucion del contrato</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Generacion de documentos legales</td>
                <td className="border border-gray-200 px-4 py-2">Ejecucion del contrato</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Procesamiento de pagos y suscripciones</td>
                <td className="border border-gray-200 px-4 py-2">Ejecucion del contrato</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Comunicaciones sobre el servicio</td>
                <td className="border border-gray-200 px-4 py-2">Interes legitimo</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Mejora y seguridad del servicio</td>
                <td className="border border-gray-200 px-4 py-2">Interes legitimo</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Cumplimiento de obligaciones legales</td>
                <td className="border border-gray-200 px-4 py-2">Obligacion legal</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 4. THIRD PARTIES */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">4. Encargados del tratamiento y terceros</h2>
          <p>Compartimos sus datos con los siguientes proveedores de servicios, estrictamente necesarios para el funcionamiento de la plataforma:</p>
          <table className="w-full border-collapse text-sm mt-3">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-navy-800">Proveedor</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-navy-800">Finalidad</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-navy-800">Ubicacion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Supabase Inc.</td>
                <td className="border border-gray-200 px-4 py-2">Base de datos, autenticacion y almacenamiento</td>
                <td className="border border-gray-200 px-4 py-2">EE.UU. (con garantias adecuadas)</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Stripe Inc.</td>
                <td className="border border-gray-200 px-4 py-2">Procesamiento de pagos</td>
                <td className="border border-gray-200 px-4 py-2">EE.UU. (con garantias adecuadas)</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Vercel Inc.</td>
                <td className="border border-gray-200 px-4 py-2">Alojamiento web y CDN</td>
                <td className="border border-gray-200 px-4 py-2">EE.UU. (con garantias adecuadas)</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3">
            Todos los proveedores cuentan con Clausulas Contractuales Tipo (SCCs) aprobadas por
            la Comision Europea para garantizar un nivel adecuado de proteccion en las
            transferencias internacionales de datos.
          </p>
        </section>

        {/* 5. DATA RETENTION */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">5. Conservacion de datos</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Datos de cuenta:</strong> Mientras mantenga su cuenta activa y durante un periodo adicional de 30 dias tras la eliminacion.</li>
            <li><strong>Datos de documentos:</strong> Mientras mantenga su cuenta activa. Puede eliminar documentos individuales en cualquier momento.</li>
            <li><strong>Datos de pago:</strong> Conservados por Stripe segun su propia politica de retencion y las obligaciones fiscales aplicables.</li>
            <li><strong>Datos tecnicos:</strong> Maximo 90 dias para logs de servidor.</li>
          </ul>
        </section>

        {/* 6. USER RIGHTS */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">6. Sus derechos</h2>
          <p>
            De conformidad con el Reglamento General de Proteccion de Datos (RGPD) y la Ley
            Organica 3/2018 de Proteccion de Datos (LOPD-GDD), usted tiene los siguientes derechos:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><strong>Acceso:</strong> Solicitar una copia de sus datos personales.</li>
            <li><strong>Rectificacion:</strong> Corregir datos inexactos o incompletos.</li>
            <li><strong>Supresion:</strong> Solicitar la eliminacion de sus datos ("derecho al olvido").</li>
            <li><strong>Limitacion:</strong> Solicitar la restriccion del tratamiento en determinadas circunstancias.</li>
            <li><strong>Portabilidad:</strong> Recibir sus datos en un formato estructurado y de uso comun.</li>
            <li><strong>Oposicion:</strong> Oponerse al tratamiento basado en interes legitimo.</li>
          </ul>
          <p className="mt-3">
            Para ejercer estos derechos, envie un correo a <strong>privacidad@contratoya.es</strong>{' '}
            con una copia de su documento de identidad. Responderemos en un plazo maximo de 30 dias.
          </p>
          <p className="mt-3">
            Si considera que el tratamiento de sus datos no es conforme a la normativa, puede
            presentar una reclamacion ante la{' '}
            <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-success-600 hover:text-success-700 underline">
              Agencia Espanola de Proteccion de Datos (AEPD)
            </a>.
          </p>
        </section>

        {/* 7. COOKIES */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">7. Cookies</h2>
          <p>Utilizamos las siguientes cookies:</p>
          <table className="w-full border-collapse text-sm mt-3">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-navy-800">Cookie</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-navy-800">Tipo</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-navy-800">Finalidad</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-navy-800">Duracion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2">sb-*-auth-token</td>
                <td className="border border-gray-200 px-4 py-2">Estrictamente necesaria</td>
                <td className="border border-gray-200 px-4 py-2">Autenticacion de sesion</td>
                <td className="border border-gray-200 px-4 py-2">Sesion</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">cookie-consent</td>
                <td className="border border-gray-200 px-4 py-2">Estrictamente necesaria</td>
                <td className="border border-gray-200 px-4 py-2">Recordar preferencia de cookies</td>
                <td className="border border-gray-200 px-4 py-2">1 ano</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3">
            Solo utilizamos cookies estrictamente necesarias para el funcionamiento del servicio.
            No utilizamos cookies de publicidad ni de seguimiento de terceros.
          </p>
        </section>

        {/* 8. SECURITY */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">8. Seguridad</h2>
          <p>
            Implementamos medidas tecnicas y organizativas adecuadas para proteger sus datos,
            incluyendo:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Cifrado de datos en transito (TLS/HTTPS)</li>
            <li>Cifrado de contrasenas (bcrypt)</li>
            <li>Aislamiento de datos por usuario mediante Row-Level Security (RLS)</li>
            <li>Acceso restringido a bases de datos mediante claves de servicio</li>
          </ul>
        </section>

        {/* 9. INTERNATIONAL TRANSFERS */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">9. Transferencias internacionales</h2>
          <p>
            Sus datos pueden ser transferidos a servidores ubicados en Estados Unidos
            (Supabase, Stripe, Vercel). Estas transferencias se realizan al amparo de
            Clausulas Contractuales Tipo (SCCs) aprobadas por la Comision Europea
            (Decision 2021/914), garantizando un nivel adecuado de proteccion conforme
            al articulo 46.2.c) del RGPD.
          </p>
        </section>

        {/* 10. BREACH NOTIFICATION */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">10. Notificacion de brechas de seguridad</h2>
          <p>
            En caso de brecha de seguridad que suponga un riesgo para sus derechos y libertades,
            le notificaremos sin dilacion indebida y, en todo caso, dentro de las 72 horas
            siguientes a tener conocimiento de la misma, conforme al articulo 33 del RGPD.
          </p>
        </section>

        {/* 11. MINORS */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">11. Menores de edad</h2>
          <p>
            El Servicio esta destinado a mayores de 18 anos. No recopilamos conscientemente
            datos de menores de edad. Si tenemos conocimiento de que hemos recopilado datos
            de un menor, los eliminaremos de inmediato.
          </p>
        </section>

        {/* 12. CHANGES */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">12. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de actualizar esta Politica de Privacidad. Cualquier
            cambio sera publicado en esta pagina con la fecha de actualizacion correspondiente.
            Para cambios sustanciales, notificaremos a los usuarios registrados por correo
            electronico.
          </p>
        </section>

        {/* 13. CONTACT */}
        <section>
          <h2 className="text-lg font-semibold text-navy-800 mb-3">13. Contacto</h2>
          <p>
            Para cualquier consulta relacionada con la proteccion de sus datos personales:
          </p>
          <ul className="list-none mt-2 space-y-1">
            <li>Correo: <strong>privacidad@contratoya.es</strong></li>
          </ul>
        </section>

      </div>
    </div>
  )
}

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const TSV_URL =
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSljxcZTbpEMEogWlrc01-P9NPzuh_45bAEKOtYFLxHNkL2B3i5sYJvvQ5TI3oTIS_6ha_GmNH16deF/pub?gid=725792020&single=true&output=tsv';
  
    Papa.parse(TSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      delimiter: '\t',
      complete: (results) => {
        // 3) Mostrar fecha de última actualización (cliente)
        const now = new Date().toLocaleString();
        document.getElementById('lastUpdate').textContent = `Actualizado: ${now}`;
  
        // Inicializar DataTable sin paginación y con scrollX
        const table = $('#tablaRep').DataTable({
          data: results.data,
          columns: [
            { data: 'Canción' },
            { data: 'Artista' },
            { data: 'Categoría' },
            { data: 'Instrumentos' },
            {
              data: 'Estado',
              render: (s) => {
                let cls = 'badge-pendiente';
                if (s.toLowerCase().includes('proceso')) cls = 'badge-proceso';
                if (s.toLowerCase().includes('listo'))   cls = 'badge-listo';
                return `<span class="badge ${cls}" title="Estado: ${s}">${s}</span>`;
              }
            },
            { data: 'Docente' },
            { data: 'Bajo' },
            { data: 'Batería' },
            { data: 'Canto' },
            { data: 'Cello' },
            { data: 'Guitarra acústica' },
            { data: 'Guitarra eléctrica' },
            { data: 'Piano' },
            { data: 'Ukelele' },
            { data: 'Viola' },
            { data: 'Violín' }
          ],
          scrollX: true,
          autoWidth: false,
          paging: false,        // lista completa, sin páginas
          language: {
            search: '🔎 Buscar:',
            lengthMenu: 'Mostrar _MENU_ registros',
            info: 'Mostrando _START_ a _END_ de _TOTAL_',
            paginate: { next: '»', previous: '«' }
          },
          responsive: true,
          initComplete: function() {
            //  Add top scrollbar
            const api = this.api();
            const $wrapper = $(api.table().container());
            const $scrollBody = $wrapper.find('.dataTables_scrollBody');
            const scrollWidth = $scrollBody[0].scrollWidth;
            const $topScroll = $(`
              <div class="scroll-x-top">
                <div class="scroll-x-top-inner" style="width:${scrollWidth}px;"></div>
              </div>`);
            // insert above body (below header)
            $wrapper.find('.dataTables_scrollHead').after($topScroll);
            // sync scroll positions
            $topScroll.on('scroll', () => {
              $scrollBody.scrollLeft($topScroll.scrollLeft());
            });
            $scrollBody.on('scroll', () => {
              $topScroll.scrollLeft($scrollBody.scrollLeft());
            });
          }
        });
      },
      error: (err) => {
        console.error('Error al cargar TSV:', err);
        alert('No se pudo cargar el repertorio. Revisa la URL o tu conexión.');
      }
    });
  });
  
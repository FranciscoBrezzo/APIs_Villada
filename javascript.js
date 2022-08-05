$(document).ready(function () {

    var url = "https://randomuser.me/api/?results=10";
    var p = "";
    var RadioBtn;
    var Nacionalidad;
    var CargarMas;

    fetchInformation(url);

    $("input[type='radio']").click(function () {
        RadioBtn = $("input[name='gender']:checked").val();
        Nacionalidad = $('#nationality :selected').val();
        $("#result").empty();
        url = "https://randomuser.me/api/?results=10&gender=" + RadioBtn + "&nat=" + Nacionalidad;
        if (RadioBtn) {
            fetchInformation(url);
        }
    });

    $('#nationality').on('change', function () {
        var p = "";
        $("#result").empty();
        Nacionalidad = $('#nationality :selected').val();
        console.log(Nacionalidad.value);
        url = "https://randomuser.me/api/?results=10&gender=" + RadioBtn + "&nat=" + Nacionalidad;
        fetchInformation(url);
    });

    function fetchInformation(url) {
        fetch(url)
            .then((response) => response.json())
            .then(function (data) {

                data.results.forEach(person => {

                    p = `

                        <div class="card" style="width: 20%">
                        <img src="${person.picture.medium}" class="img-rounded" alt="image">
  <div class="card-body">
    <h5 class="card-title"> <span style="margin-left:25px;">${person.name.title}  ${person.name.first} ${person.name.last}</span></h5>
                           <span>(${person.nat})</span>
                        
    <span style="margin-left:5px;">Email: ${person.email}</span>
  </div>
</div>

                    </div>`;
                    $("#result").append(p);

                });

                CargarMas = '<button id="loadmore" class="btn btn-primary">Load More</button>';

                $("#result").append(CargarMas);

                $('#loadmore').on('click', function () {
                    fetchInformation(url);
                    $(this).remove();
                });


            })
    }

});
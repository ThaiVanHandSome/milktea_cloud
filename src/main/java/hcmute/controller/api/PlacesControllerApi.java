package hcmute.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("api")
public class PlacesControllerApi {

    private String googleApiKey = "AIzaSyCZe1iWRKx0FQfRUxUTbNBcjdh5o8sZMdE";

    @GetMapping("/places")
    public ResponseEntity<Object> getPlaces(@RequestParam String query) {
        String url = String.format("https://maps.googleapis.com/maps/api/place/textsearch/json?query=%s&key=%s&libraries=places&callback=initAutocomplete", query, googleApiKey);
        RestTemplate restTemplate = new RestTemplate();
        Object places = restTemplate.getForObject(url, Object.class);
        return ResponseEntity.ok().body(places);
    }
}

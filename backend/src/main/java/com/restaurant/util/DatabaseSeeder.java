package com.restaurant.util;

import com.restaurant.model.MenuItem;
import com.restaurant.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Override
    public void run(String... args) throws Exception {
        if (menuItemRepository.count() == 0) {
            seedMenuItems();
        }
    }

    private void seedMenuItems() {
        MenuItem[] items = {
                new MenuItem("Madagascar Vanilla", "Classic vanilla bean speckled cream.", new BigDecimal("119"),
                        "Scoops"),
                new MenuItem("Belgian Chocolate", "Rich dark chocolate goodness.", new BigDecimal("149"), "Scoops"),
                new MenuItem("Strawberry Fields", "Fresh strawberries blended with cream.", new BigDecimal("129"),
                        "Scoops"),
                new MenuItem("Mint Choco Chip", "Refreshing mint with dark chocolate chips.", new BigDecimal("139"),
                        "Scoops"),
                new MenuItem("Cookie Dough", "Vanilla base with chunks of cookie dough.", new BigDecimal("149"),
                        "Scoops"),
                new MenuItem("Butterscotch Crunch", "Crunchy praline in golden ice cream.", new BigDecimal("129"),
                        "Scoops"),

                new MenuItem("Death by Chocolate", "Brownie, chocolate sauce, and 3 scoops of cocoa.",
                        new BigDecimal("249"), "Sundaes"),
                new MenuItem("Banana Split", "Classic trio flavor with fresh bananas and nuts.", new BigDecimal("229"),
                        "Sundaes"),
                new MenuItem("Berry Bonanza", "Mixed berry compote over vanilla scoops.", new BigDecimal("219"),
                        "Sundaes"),
                new MenuItem("Hot Fudge Nutty", "Vanilla ice cream topped with hot fudge and cashews.",
                        new BigDecimal("199"), "Sundaes"),

                new MenuItem("Thick Chocolate", "Double churned chocolate milk.", new BigDecimal("179"), "Shakes"),
                new MenuItem("Oreo Overload", "Crunchy Oreos blended with vanilla cream.", new BigDecimal("189"),
                        "Shakes"),
                new MenuItem("Strawberry Bliss", "Fresh strawberry milkshake.", new BigDecimal("169"), "Shakes"),
                new MenuItem("KitKat Break", "Wafer chocolate blend.", new BigDecimal("189"), "Shakes"),

                new MenuItem("Belgian Waffle", "Crispy waffle with maple syrup.", new BigDecimal("149"), "Waffles"),
                new MenuItem("Nutella Waffle", "Loaded with Nutella spread.", new BigDecimal("199"), "Waffles"),
                new MenuItem("Ice Cream Waffle", "Waffle topped with a scoop of your choice.", new BigDecimal("229"),
                        "Waffles")
        };

        // Set images for some
        items[0].setImageUrl(
                "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=500&q=80");
        items[1].setImageUrl(
                "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80");
        items[2].setImageUrl(
                "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80");
        items[6].setImageUrl(
                "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80");
        items[10].setImageUrl(
                "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80");
        items[14].setImageUrl(
                "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=500&q=80");

        menuItemRepository.saveAll(Arrays.asList(items));
        System.out.println("Seeded database with Cream Island menu items.");
    }
}

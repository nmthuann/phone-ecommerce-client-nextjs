"use client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { City, District, Ward } from "@/types/location.type";
import { Input, Select, SelectItem } from "@heroui/react";
import { ErrorInput } from "@/constants/errors.enum";

type ShippingAddressFormValues = z.infer<typeof ShippingAddressFormSchema>;
const defaultValues: Partial<ShippingAddressFormValues> = {
    address: ""
};

interface ShippingAddressFormProps {
    location: City[];
}

export const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
    location
}) => {
    // const { user } = useAuthContext()
    const [city, setCity] = useState<string>("");
    const [districtList, setDistrictList] = useState<District[]>([]);
    const [district, setDistrict] = useState<string>("");
    const [wardList, setWardList] = useState<Ward[]>([]);

    /**
     * 1. tại sao đoạn mã này chạy đúng theo yêu. vì:
     * data: dữ liệu cây -> parent - child
     *
     * 2. đoạn mã 1800:
     * call lần đầu dc city []
     * từ city [] lấy city_id để call tiếp cho giá trị của districts ...
     * wards tương tự cần {city_id, distric_id}
     *
     */
    console.log(city, district);
    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCityId: string = event.target.value;
        setCity(selectedCityId);
        const selectedDistricts = location.find(
            (city: City) => city.Id === selectedCityId
        );
        if (selectedDistricts) {
            setDistrictList(selectedDistricts.Districts || []);
        } else {
            setDistrictList([]);
        }
    };

    const handleDistrictChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedDistrictId: string = event.target.value;
        setDistrict(selectedDistrictId);
        const selectedWards: District | undefined = districtList.find(
            (district: District) => district.Id === selectedDistrictId
        );

        if (selectedWards) {
            setWardList(selectedWards.Wards || []);
        } else {
            setWardList([]);
        }
    };

    const form = useForm<z.infer<typeof ShippingAddressFormSchema>>({
        resolver: zodResolver(ShippingAddressFormSchema),
        defaultValues
    });

    async function onSubmit(values: z.infer<typeof ShippingAddressFormSchema>) {
        console.log("ShippingAddressForm:::", values);
    }

    return (
        // <div className="bg-white mt-5">
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3 rounded-2xl "
                >
                    {/* City */}
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select
                                        isRequired
                                        label="Tỉnh thành"
                                        placeholder="Chọn tỉnh"
                                        className="max-w-full"
                                        selectionMode="single"
                                        {...field} // Spread operator sau khi định nghĩa onChange
                                        onChange={(event) => {
                                            handleCityChange(event);
                                            field.onChange(event); // Gọi sự kiện onChange từ field
                                        }}
                                    >
                                        {location.map((city: City) => (
                                            <SelectItem
                                                key={city.Id}
                                                onPress={() => {
                                                    form.setValue(
                                                        "city",
                                                        city.Name
                                                    );
                                                }}
                                            >
                                                {city.Name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* District */}
                    <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select
                                        isRequired
                                        label="Quận/ Huyện"
                                        placeholder="Chọn quận/ huyện"
                                        className="max-w-full"
                                        selectionMode="single"
                                        {...field} // Spread operator sau khi định nghĩa onChange
                                        onChange={(event) => {
                                            handleDistrictChange(event);
                                            field.onChange(event); // Gọi sự kiện onChange từ field
                                        }}
                                    >
                                        {districtList.map((district) => (
                                            <SelectItem
                                                key={district.Id}
                                                onPress={() => {
                                                    form.setValue(
                                                        "district",
                                                        district.Name
                                                    );
                                                }}
                                            >
                                                {district.Name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Ward */}
                    <FormField
                        control={form.control}
                        name="ward"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select
                                        isRequired
                                        items={wardList}
                                        label="Phường/ Xã"
                                        placeholder="Chọn phường/ xã"
                                        selectionMode="single"
                                        className="max-w-full"
                                        {...field}
                                    >
                                        {(ward) => (
                                            <SelectItem
                                                key={ward.Id}
                                                onPress={() => {
                                                    form.setValue(
                                                        "ward",
                                                        ward.Name
                                                    );
                                                }}
                                            >
                                                {ward.Name}
                                            </SelectItem>
                                        )}
                                    </Select>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Địa Chỉ */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        isRequired
                                        label="Địa chỉ"
                                        placeholder="Vui lòng nhập địa chỉ nhà, đường ..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
};

const ShippingAddressFormSchema = z.object({
    address: z.string().min(1, {
        message: `${ErrorInput.NOT_FULL_FIELD}`
    }),
    city: z.string().min(1, {
        message: `${ErrorInput.NOT_FULL_FIELD}`
    }),
    district: z.string().min(1, {
        message: `${ErrorInput.NOT_FULL_FIELD}`
    }),
    ward: z.string().min(1, {
        message: `${ErrorInput.NOT_FULL_FIELD}`
    })
});
